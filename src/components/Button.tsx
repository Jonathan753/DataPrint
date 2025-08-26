import { Link } from 'react-router-dom';

interface ButtonProps {
    nome: string;
    img: string;
    rota: string;
}

const Button = ({ nome, img, rota }: ButtonProps) => {
    return (
        <>
            <Link to={rota}>
                <div className='p-0.5 flex w-full hover:bg-blue-200 rounded-2xl'>
                    <button type="button" className="shadow-xl/30 p-2.5 m-1 w-15 h-15 cursor-pointer bg-blue-500 rounded-full border-b-slate-800" >
                        <img src={img} className='h-7 m-auto' alt={nome} />
                    </button>
                    <h3 className='p-2 font-bold mt-4'>{nome}</h3>
                </div>
            </Link>

        </>
    )
}

export default Button