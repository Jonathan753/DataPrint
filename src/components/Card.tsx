import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
    conteudo: number;
    nav: string;
}

const Card = ({ title, conteudo, nav }: Props) => {
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate(nav)} className="cursor-pointer bg-background-surface rounded-md shadow-md w-50 h-56 mx-auto flex flex-col transition delay-150 ease-linear hover:-translate-y-1 hover:scale-110">
                <div className="text-center py-6 border-b border-gray-500 mx-4">
                    <h3 className="text-4xl">{title}</h3>
                </div>
                <div className="text-center my-auto">
                    <h1 className="text-6xl">{conteudo}</h1>
                </div>
            </div>
        </>
    )
}

export default Card;