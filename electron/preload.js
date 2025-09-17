const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

contextBridge.exposeInMainWorld("clients", {
    add: (data) => ipcRenderer.invoke("clients:add", data),
    all: () => ipcRenderer.invoke("clients:all"),
    getById: (id) => ipcRenderer.invoke("clients:getById", id)
});

contextBridge.exposeInMainWorld("myInfo", {
    get: () => ipcRenderer.invoke("myInfo:get"),
    save: (data) => ipcRenderer.invoke("myInfo:save", data),
});

contextBridge.exposeInMainWorld("services", {
    add: (data) => ipcRenderer.invoke("services:add", data),
    all: () => ipcRenderer.invoke("services:all"),
    search: (term) => ipcRenderer.invoke("services:search", term),
});
//Titlebar

// contextBridge.exposeInMainWorld('electron', {
//   send: (channel, ...args) => {
//     const validChannels = ['minimize-app', 'maximize-app', 'close-app'];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, ...args);
//     }
//   },
// });