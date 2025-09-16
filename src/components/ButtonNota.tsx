import { File } from "lucide-react";

interface Props {
    onClick?: () => void
}


const ButtonNota = ({ onClick }: Props) => {
    // Fazer o botao de salvar 
    return (
        <>
            <button onClick={onClick} type="submit" className="px-4 py-2 flex gap-2 bg-green-700 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <File size={20} />
            </button>
        </>
    )
}

export default ButtonNota