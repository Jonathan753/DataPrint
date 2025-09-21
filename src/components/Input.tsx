import type { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    gridClass?: string;
}

const Input = ({ label, id, gridClass = "", ...props }: InputProps) => {
    return (
        <div className={gridClass}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                transition duration-150 ease-in-out"
                {...props}
            />
        </div>
    );
}

export default Input;