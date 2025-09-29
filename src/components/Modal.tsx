type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void
    title: string;
    message: string;
};

const Modal = ({ isOpen, onClose, title, message }: ModalProps) => {
    if (!isOpen) return null; // se não estiver aberto, não renderiza

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <p className="mb-6">{message}</p>
                    <div className="flex justify-end">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Modal };

const ModalDelete = ({ isOpen, onClose, onDelete, title, message }: ModalProps) => {
    if (!isOpen) return null; // se não estiver aberto, não renderiza

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <p className="mb-6">{message}</p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-400"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { ModalDelete };