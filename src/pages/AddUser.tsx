const AddUser = () => {
    return (
        <>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Bem-vindo de volta, Dev!</p>
          </div>
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