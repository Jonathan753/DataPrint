import { UserPen } from "lucide-react";

interface Props {
    onClick?: () => void
}

const ButtonUpdate = ({ onClick }: Props) => {
    // Fazer o botao de salvar 
    return (
        <>
            <button onClick={onClick} type="submit" className="px-4 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <UserPen size={20} /> </button>
        </>
    )
}

export default ButtonUpdate