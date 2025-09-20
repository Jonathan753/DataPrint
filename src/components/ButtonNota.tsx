import { File } from "lucide-react";

interface Props {
    onClick?: () => void,
    textMain?: string

}
const ButtonNota = ({ onClick, textMain }: Props) => {
    // Fazer o botao de salvar 
    return (
        <>
            <button onClick={onClick} type="submit" className="relative group text-green-500 hover:text-green-800 transition-colors ">
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

export default ButtonNota