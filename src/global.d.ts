// src/global.d.ts
export interface IElectronAPI {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}