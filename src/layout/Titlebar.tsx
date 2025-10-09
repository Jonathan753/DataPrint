// src/layout/TitleBar.tsx
import { Minus, Square, X } from 'lucide-react';
import React from 'react';

const TitleBar: React.FC = () => {

    const handleMinimize = () => {
        window.electronAPI.minimize();
    };

    const handleMaximize = () => {
        window.electronAPI.maximize();
    };

    const handleClose = () => {
        window.electronAPI.close();
    };

    return (
        <div className="
      top-0 left-0 w-full h-8 bg-accent-primary text-white
      flex justify-between items-center select-none z-50
    ">
            {/* Área arrastável */}
            <div
                className="title-bar flex-grow h-full flex items-center pl-3 justify-center"
            >
                <h3>Data Print</h3>
                {/* O título já estava no seu App.tsx, mantendo aqui a consistência */}
            </div>

            {/* Botões de controle */}
            <div className="h-full flex [--webkit-app-region:no-drag]">
                <button
                    className="
            h-full w-[46px] flex justify-center items-center cursor-pointer 
            text-[10px] hover:bg-white/10
          "
                    style={{ fontFamily: 'Segoe MDL2 Assets' }} // Manter a fonte de ícones
                    onClick={handleMinimize}
                >
                    <Minus size={16} />
                </button>
                <button
                    className="
            h-full w-[46px] flex justify-center items-center cursor-pointer 
            text-[10px] hover:bg-white/10
          "
                    style={{ fontFamily: 'Segoe MDL2 Assets' }}
                    onClick={handleMaximize}
                >
                    <Square size={12} />
                </button>
                <button
                    className="
            h-full w-[46px] flex justify-center items-center cursor-pointer 
            text-[10px] hover:bg-red-600
          "
                    style={{ fontFamily: 'Segoe MDL2 Assets' }}
                    onClick={handleClose}
                >

                    <X size={16} />
                </button>
            </div>
        </div>
    );
};


export default TitleBar;