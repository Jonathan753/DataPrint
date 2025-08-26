const AddUser = () => {
    return (
        <>
            <h1 className="p-1.5 text-3xl">Adicionar Cliente</h1>
            <div className="bg-blue-100 rounded-xl p-5 pl-14">
                <div className="mt-1.5 ml-1.5">
                    <input className="entrada-texto" type="text" />
                    <input className="entrada-texto" type="text" />
                    <input className="entrada-texto" type="text" />
                    <input className="entrada-texto" type="text" />
                </div>
            </div>
        </>
    )
}

export default AddUser;