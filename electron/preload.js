const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

contextBridge.exposeInMainWorld("clients", {
    add: (client) => ipcRenderer.invoke("clients:add", client),
    all: () => ipcRenderer.invoke("clients:all"),
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