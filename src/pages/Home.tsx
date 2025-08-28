import Button from "../components/Button"


const Home = () => {
    return (
        <>

            <div className="bg-blue-100 rounded-xl p-5 pl-14">
            <Button nome='Adicionar' rota='add-user'  />
            <Button nome='Adicionar Prod' rota='add-seervice'  />
            <Button nome='Listar cliente' rota='add-seervice'  />
            </div>
        </>
    )
}

export default Home