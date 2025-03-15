import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import BusinessManager from './lib'
import { Types } from 'mongoose'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1152,
    height: 864,
    show: false,
    autoHideMenuBar: true,
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

  const businessManager = new BusinessManager()
  businessManager.once('ready', async () => {
    console.log('- Database is ready for use')

    try {
      await businessManager.addEquipment({
        lid: new Types.ObjectId('67d4b72ac7b669b35f0ddf77'),
        type: 'Washing Machine',
        serialNumber: '',
        name: 'Machine One',
        capacity: 8,
        minutesPerCycle: 45,
        powerUsagePerCycle: 0,
        waterUsagePerCycle: 0,
        pricePerCycle: 25,
        ownership: {
          type: 'Lease',
          // lease: { provider: String, startDate: Date, endDate: Date },
          cost: 200
        },
        // serviceHistory: { type: [equipmentServiceSchema], default: [] },
        isOperational: true
      })
    } catch ({ message }) {
      console.log(message)
    }
  })

  // IPC handlers
  ipcMain.handle('business:getGeneralData', () => businessManager.getGeneralData())

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
