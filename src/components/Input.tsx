import type { InputHTMLAttributes } from "react";
import InputMask, { type Props as InputMaskProps } from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    gridClass?: string;
    mask?: string;
}

const Input = ({ label, id, gridClass = "", mask, ...props }: InputProps) => {

    // As propriedades do input que serão compartilhadas
    const inputProps = {
        id: id,
        className: `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition duration-150 ease-in-out`,
        ...props
    };

    return (
        <div className={gridClass}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            
            {/* 3. ADICIONADO: Lógica condicional */}
            {mask ? (
                // Se uma máscara for fornecida, renderiza o InputMask
                <InputMask {...(inputProps as InputMaskProps)} mask={mask} >
                  {/* A biblioteca pede uma função como filho para passar as props ao input real */}
                  {(props: any) => <input {...props} />}
                </InputMask>
            ) : (
                // Se não houver máscara, renderiza um input normal (comportamento original)
                <input {...inputProps} />
            )}
        </div>
    );
}

export default Input;