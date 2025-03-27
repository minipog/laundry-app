import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getDashboardData: () => ipcRenderer.invoke('business:getDashboardData'),
  getEquipment: (query) => ipcRenderer.invoke('business:getEquipment', query),
  addEquipment: (values, isNew) => ipcRenderer.invoke('business:addEquipment', values, isNew),
  getEquipmentServices: (query) => ipcRenderer.invoke('business:getEquipmentServices', query),
  getLocations: (query) => ipcRenderer.invoke('business:getLocations', query),
  getNotes: (query) => ipcRenderer.invoke('business:getNotes', query),
  toggleNoteStatus: (id) => ipcRenderer.invoke('business:toggleNoteStatus', id),
  appClose: () => ipcRenderer.invoke('app:close'),
  appMinimize: () => ipcRenderer.invoke('app:minimize'),
  appMaximize: () => ipcRenderer.invoke('app:maximize')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
