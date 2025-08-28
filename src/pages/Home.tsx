import Button from "../components/Button"



const Home = () => {
    return (
        <>
            <h1 className="ml-8 mb-4 mt-4 text-5xl">Serviços</h1>
            <div className="bg-blue-100 rounded-xl p-5 pl-14">
            <Button nome='Adicionar' rota='add-user'  />
            <Button nome='Adicionar Prod' rota='add-seervice'  />
            <Button nome='Listar cliente' rota='add-seervice'  />
            </div>
        </>
    )
}

export default Home