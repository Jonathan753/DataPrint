import type { InputHTMLAttributes } from "react";
import { IMaskInput, type IMaskInputProps } from "react-imask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    gridClass?: string;
    mask?: any
}

const lettersUfMask = {
    // mask: /^[a-zA-Z\s]*$/, // RegExp que aceita apenas letras e espaços
    mask: 'aa', // RegExp que aceita apenas letras e espaços
    prepare: (str: string) => str.toUpperCase(), // Função que converte para maiúsculas
};

// NOVO: Definição da máscara dinâmica para CPF/CNPJ
const cpfCnpjMask = [
    {
        mask: '000.000.000-00',
        maxLength: 11,
    },
    {
        mask: '00.000.000/0000-00',
    }
];

const Input = ({ label, id, gridClass = "", mask, ...props }: InputProps) => {

    const commonProps = {
        id: id,
        className: `w-full px-3 py-2 border border-gray-600 text-text-primary rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-indigo-400
                    transition duration-150 ease-in-out bg-background-surface placeholder:text-gray-500`,
        ...props
    };

    // MODIFICADO: Lógica para escolher a máscara correta
    const maskConfig = mask === 'cpf-cnpj'
        ? {
            mask: cpfCnpjMask,
            dispatch: (appended: string, dynamicMasked: any) => {
                const rawValue = (dynamicMasked.value + appended).replace(/\D/g, "");
                if (rawValue.length <= 11) {
                    return dynamicMasked.compiledMasks[0]; // Retorna a máscara de CPF
                }
                return dynamicMasked.compiledMasks[1]; // Retorna a máscara de CNPJ
            }
        }
        : mask === "letters-uf" ? lettersUfMask
            : mask; // Se não for 'cpf-cnpj', usa a string da máscara como antes


    return (
        <div className={gridClass}>
            <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
                {label}
            </label>

            {mask ? (
                <IMaskInput
                    {...commonProps}
                    // MODIFICADO: Passa a configuração da máscara (pode ser a string ou o objeto dinâmico)
                    {...(typeof maskConfig === 'string' ? { mask: maskConfig } : maskConfig)}
                />
            ) : (
                <input {...commonProps} />
            )}
        </div>
    );
}

export default Input;