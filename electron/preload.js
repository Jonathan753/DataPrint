const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
});

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
    paginated: (options) => ipcRenderer.invoke("receipt:paginated", options),
    client: (options) => ipcRenderer.invoke("receipt:client", options),
    getReceipt: (id) => ipcRenderer.invoke("receipt:getReceipt", id),
    generatePdf: (receiptId) => ipcRenderer.invoke("receipt:generate-pdf", receiptId), // <-- ADICIONE ESTA LINHA
});

contextBridge.exposeInMainWorld("receipt_services", {
    getById: (id) => ipcRenderer.invoke("receipt_services:getById", id),
    getByIdService: (id) => ipcRenderer.invoke("receipt_services:getByIdService", id),
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
