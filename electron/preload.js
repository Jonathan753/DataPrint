const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

// contextBridge.exposeInMainWorld('electronAPI', {
//     printNota: (html) => ipcRenderer.invoke('print-nota', html),
// });

// contextBridge.exposeInMainWorld('pdf', {
//     gerar: (html) => ipcRenderer.invoke('pdf:gerar', html),
//     imprimir: (html) => ipcRenderer.invoke('pdf:imprimir', html),
// });

contextBridge.exposeInMainWorld("clients", {
    add: (data) => ipcRenderer.invoke("clients:add", data),
    all: (options) => ipcRenderer.invoke("clients:all", options),
    getById: (id) => ipcRenderer.invoke("clients:getById", id),
    delete: (id) => ipcRenderer.invoke("clients:delete", id),
    update: (client) => ipcRenderer.invoke("clients:update", client),
    totalNumber: () => ipcRenderer.invoke("clients:totalNumber"),
});

contextBridge.exposeInMainWorld("receipt", {
    add: (data) => ipcRenderer.invoke("receipt:add", data),
    getMaxNumber: () => ipcRenderer.invoke("receipt:getMaxNumber"),
    all: () => ipcRenderer.invoke("receipt:all"),
    getClient: (id) => ipcRenderer.invoke("receipt:getClient", id),
    paginated: (options) => ipcRenderer.invoke("receipt:paginated", options), // <-- ADICIONE AQUI
    client: (options) => ipcRenderer.invoke("receipt:client", options), // <-- ADICIONE AQUI
});

contextBridge.exposeInMainWorld("receipt_services", {
    getById: (id) => ipcRenderer.invoke("receipt_services:getById", id),
    all: () => ipcRenderer.invoke("receipt_services:all"),
});

contextBridge.exposeInMainWorld("myInfo", {
    get: () => ipcRenderer.invoke("myInfo:get"),
    save: (data) => ipcRenderer.invoke("myInfo:save", data),
});

contextBridge.exposeInMainWorld("services", {
    add: (data) => ipcRenderer.invoke("services:add", data),
    getById: (id) => ipcRenderer.invoke("services:getById", id),
    all: (options) => ipcRenderer.invoke("services:all", options),
    search: (term) => ipcRenderer.invoke("services:search", term),
    update: (data) => ipcRenderer.invoke("services:update", data),
});

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-app'),
    maximize: () => ipcRenderer.send('maximize-app'),
    close: () => ipcRenderer.send('close-app'),
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