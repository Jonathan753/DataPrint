import type { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    gridClass?: string;
    mask?: any
}

const lettersUfMask = {
    mask: 'aa',
    prepare: (str: string) => str.toUpperCase(),
};

const cpfCnpjMask = [
    { mask: '000.000.000-00', maxLength: 11 },
    { mask: '00.000.000/0000-00' }
];

const Input = ({ label, id, gridClass = "", onChange, mask, ...props }: InputProps) => {

    const commonProps = {
        id: id,
        className: `w-full px-3 py-2 border border-gray-600 text-text-primary rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-indigo-400
                    transition duration-150 ease-in-out bg-background-surface placeholder:text-gray-500
                    disabled:text-text-disabled disabled:border-gray-300`,
        ...props
    };

    const maskConfig = mask === 'cpf-cnpj'
        ? {
            mask: cpfCnpjMask,
            dispatch: (appended: string, dynamicMasked: any) => {
                const rawValue = (dynamicMasked.value + appended).replace(/\D/g, "");
                if (rawValue.length <= 11) {
                    return dynamicMasked.compiledMasks[0];
                }
                return dynamicMasked.compiledMasks[1];
            }
        }
        : mask === "letters-uf" ? lettersUfMask
            : mask;

    const handleAccept = (value: any) => {
        if (onChange) {
            const syntheticEvent = {
                target: {
                    name: props.name || '',
                    value: value,
                },
            };

            onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };
    return (
        <div className={gridClass}>
            <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
                {label}
            </label>

            {mask ? (
                <IMaskInput
                    {...commonProps}
                    {...(typeof maskConfig === 'string' ? { mask: maskConfig } : maskConfig)}

                    onAccept={handleAccept}
                />
            ) : (

                <input {...commonProps} onChange={onChange} />
            )}
        </div>
    );
}

export default Input;