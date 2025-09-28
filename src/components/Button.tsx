import { Eye, File, Pencil, Printer, RotateCcw, Save, Trash2 } from "lucide-react";

interface Props {
    onClick?: () => void
    textMain?: string
}


const ButtonSave = () => {
    return (
        <>
            <button type="submit" className="px-6 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Save size={20} /> Salvar
            </button>
        </>
    )
}
export { ButtonSave };

const ButtonReset = ({ onClick }: Props) => {
    return (
        <>
            <button type="reset" onClick={onClick} className="px-6 flex gap-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <RotateCcw size={20} /> Resetar Campos
            </button>
        </>
    )
}
export { ButtonReset };


const ButtonPrinter = ({ onClick }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="px-6 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Printer size={20} /> Salvar
            </button>
        </>
    )
}
export { ButtonPrinter };

const ButtonNota = ({ onClick, textMain }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="relative group text-green-500 hover:text-green-800 transition-colors ">
                <File size={20} />
                <span className="
                        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        px-2 py-1 bg-gray-800 text-white text-xs rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        pointer-events-none whitespace-nowrap">
                    {textMain}
                </span>
            </button>
        </>
    )
}
export { ButtonNota };

const ButtonDelete = ({ onClick, textMain }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="relative group text-red-600 hover:text-red-800 transition-colors">
                <Trash2 size={20} />
                <span className="
                        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        px-2 py-1 bg-gray-800 text-white text-xs rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        pointer-events-none whitespace-nowrap">
                    {textMain}
                </span>
            </button>
        </>
    )
}
export { ButtonDelete };

const ButtonUpdate = ({ onClick, textMain }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="relative group text-blue-600 hover:text-blue-800 transition-colors">
                <Pencil size={20} />
                <span className="
                        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        px-2 py-1 bg-gray-800 text-white text-xs rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        pointer-events-none whitespace-nowrap">
                    {textMain}
                </span>
            </button>
        </>
    )
}
export { ButtonUpdate };

const ButtonView = ({ onClick, textMain }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="relative group text-blue-600 hover:text-blue-800 transition-colors">
                <Eye size={20} />
                <span className="
                        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        px-2 py-1 bg-gray-800 text-white text-xs rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        pointer-events-none whitespace-nowrap">
                    {textMain}
                </span>
            </button>
        </>
    )
}
export { ButtonView };