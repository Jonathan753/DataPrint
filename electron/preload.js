const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

contextBridge.exposeInMainWorld("clients", {
    add: (client) => ipcRenderer.invoke("clients:add", client),
    all: () => ipcRenderer.invoke("clients:all"),
});

contextBridge.exposeInMainWorld("myInfo", {
    get: () => ipcRenderer.invoke("myInfo:get"),
    save: (data) => ipcRenderer.invoke("myInfo:save", data),
});

contextBridge.exposeInMainWorld("services", {
    add: (service) => ipcRenderer.invoke("services:add", service),
    all: () => ipcRenderer.invoke("services:all"),
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