import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import BusinessManager from './lib'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1152,
    minWidth: 1152,
    height: 864,
    minHeight: 864,
    show: false,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const businessManager = new BusinessManager()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  businessManager.once('ready', async () => {
    console.log('App: Database actions are ready for use')
    createWindow()
  })

  businessManager.on('error', (errorMessage) => {
    businessManager.terminate({ reason: errorMessage })
  })

  // IPC handlers
  ipcMain.handle('business:getDashboardData', () => businessManager.getDashboardData())
  ipcMain.handle('business:getEquipment', (_, query) => businessManager.getEquipment(query))
  ipcMain.handle('business:addEquipment', (_, values, isNew) =>
    businessManager.addEquipment(values, isNew)
  )
  ipcMain.handle('business:getEquipmentServices', (_, query) =>
    businessManager.getEquipmentServices(query)
  )
  ipcMain.handle('business:getLocations', (_, query) => businessManager.getLocations(query))
  ipcMain.handle('business:getNotes', (_, query) => businessManager.getNotes(query))
  ipcMain.handle('business:toggleNoteStatus', (_, id) => businessManager.toggleNoteStatus(id))

  ipcMain.handle('app:close', () => BrowserWindow.getFocusedWindow().close())
  ipcMain.handle('app:minimize', () => BrowserWindow.getFocusedWindow().minimize())
  ipcMain.handle('app:maximize', () =>
    BrowserWindow.getFocusedWindow().isMaximized()
      ? BrowserWindow.getFocusedWindow().unmaximize()
      : BrowserWindow.getFocusedWindow().maximize()
  )

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform === 'darwin') return

  await businessManager.terminate()
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
