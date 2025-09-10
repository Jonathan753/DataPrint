import { Trash } from "lucide-react";

const ButtonDelete = () => {
    // Fazer o botao de salvar 
    return (
        <>
            <button type="submit" className="px-4 py-2 flex gap-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Trash size={20} /> 
            </button>
        </>
    )
}

export default ButtonDelete