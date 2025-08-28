const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

contextBridge.exposeInMainWorld("clients", {
    add: (client) => ipcRenderer.invoke("clients:add", client),
    all: () => ipcRenderer.invoke("clients:all"),
});
