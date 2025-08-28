// src/components/TitleBar.tsx
import React from 'react';
// import type { InputHTMLAttributes } from "react";



// Declaração de tipo para o objeto "window" do Electron
declare global {
    interface Window {
        electron: {
            send: (channel: string, ...args: any[]) => void;
        };
    }
}


const TitleBar: React.FC = () => {
    const handleMinimize = () => {
        window.electron.send('minimize-app');
    };

    const handleMaximize = () => {
        window.electron.send('maximize-app');
    };

    const handleClose = () => {
        window.electron.send('close-app');
    };
    return (
        <div
            className="flex justify-between items-center h-8 bg-gray-800 text-white select-none"
            style={{ WebkitAppRegion: 'drag' }}
        >
            <div className="text-sm px-4" style={{ WebkitAppRegion: 'no-drag' }}>
                Nome do Meu App
            </div>

            <div className="flex" style={{ WebkitAppRegion: 'no-drag' }}>
                <button
                    className="w-10 h-8 hover:bg-gray-700"
                    // O `onClick` vai chamar a lógica que ainda vamos criar
                    onClick={() => {handleMinimize}}
                >
                    <span className="font-bold">-</span>
                </button>
                <button
                    className="w-10 h-8 hover:bg-gray-700"
                    onClick={() => {handleMaximize}}
                >
                    <span className="font-bold">□</span>
                </button>
                <button
                    className="w-10 h-8 hover:bg-red-500"
                    onClick={() => {handleClose }}
                >
                    <span className="font-bold">✕</span>
                </button>
            </div>
        </div>
    );
};

export default TitleBar;