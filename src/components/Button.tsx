import { ArrowRight, Edit, Eye, File, Pencil, Printer, RotateCcw, Save, Trash2, Undo, Undo2, Undo2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    onClick?: () => void
    textMain?: string
}


const ButtonSave = () => {
    return (
        <>
            <button type="submit" className="px-6 py-2 flex gap-2 bg-green-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <div className="content-center">
                    <Save size={20} />
                </div>
                Salvar
            </button>
        </>
    )
}
export { ButtonSave };

const ButtonEdit = ({ onClick }: Props) => {
    return (
        <>
            <button type="button" onClick={onClick} className="px-6 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <div className="content-center">
                    <Edit size={20} />
                </div>
                Editar
            </button>
        </>
    )
}
export { ButtonEdit };

const ButtonNext = () => {
    return (
        <>
            <button type="submit" className="px-6 py-2 flex gap-2 bg-green-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <div className="content-center">
                    <ArrowRight size={20} />
                </div>
                Continuar
            </button>
        </>
    )
}
export { ButtonNext };

const ButtonReset = ({ onClick }: Props) => {
    return (
        <>
            <button type="reset" onClick={onClick} className="px-6 flex gap-2 py-2 border border-gray-600 rounded-md text-gray-600 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400">
                <div className="content-center">

                    <RotateCcw size={20} />
                </div>
                Resetar Campos
            </button>
        </>
    )
}
export { ButtonReset };


const ButtonPrinter = ({ onClick }: Props) => {
    return (
        <>
            <button onClick={onClick} type="button" className="px-6 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <div className="content-center">

                    <Printer size={20} />
                </div>
                Salvar
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


const ButtonReturn = () => {

    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate(-1)} type="button" className="relative group transition-colors  border hover:text-gray-200 border-gray-600 hover:bg-gray-600 rounded-md p-2 mb-3">
                <Undo2 size={20} />
            </button>
        </>
    )
}
export { ButtonReturn };

