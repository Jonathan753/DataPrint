import { Save } from "lucide-react";

const ButtonSave = () => {
    return (
        <>
            <button type="submit" className="px-6 py-2 flex gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Save size={20} /> Salvar
            </button>
        </>
    )
}

export default ButtonSave;