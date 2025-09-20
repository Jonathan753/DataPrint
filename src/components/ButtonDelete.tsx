import { Trash2 } from "lucide-react";

interface Props {
    onClick?: () => void,
    textMain?: string

}

const ButtonDelete = ({ onClick, textMain }: Props) => {
    // Fazer o botao de salvar 
    return (
        <>
            <button type="submit" onClick={onClick} className="relative group text-red-600 hover:text-red-800 transition-colors">
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

export default ButtonDelete