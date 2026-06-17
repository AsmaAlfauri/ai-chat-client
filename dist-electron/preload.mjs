"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  storeToken: (token) => electron.ipcRenderer.invoke("store-token", token),
  loadToken: (encrypted) => electron.ipcRenderer.invoke("load-token", encrypted)
});
