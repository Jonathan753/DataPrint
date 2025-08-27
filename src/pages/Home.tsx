import Button from "../components/Button"
import client from "../assets/add_user.svg"
import lapis from "../assets/lapis.svg"


const Home = () => {
    return (
        <>
            <h1 className="ml-8 mb-4 mt-4 text-5xl">Serviços</h1>
            <div className="bg-blue-100 rounded-xl p-5 pl-14">
            <Button nome='Adicionar' rota='add-user' img={client} />
            <Button nome='Adicionar Prod' rota='add-seervice' img={client} />
            <Button nome='Listar cliente' rota='add-seervice' img={client} />
        </div>
        </>
    )
}

export default Home