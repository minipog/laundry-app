import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getEquipment: (query) => ipcRenderer.invoke('business:getEquipment', query),
  addEquipment: (values, isNew) => ipcRenderer.invoke('business:addEquipment', values, isNew),
  getLocation: (query) => ipcRenderer.invoke('business:getLocation', query)
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
