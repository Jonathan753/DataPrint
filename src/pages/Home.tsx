const Home = () => {
    return (
        <>
            <div className="p-8">
                <div className="max-w-screen-md mx-auto ">
                    <div className="flex justify-around flex-wrap px-24 gap-3">
                        <div className="bg-background-surface h-60 w-60 rounded-lg border-border shadow-md flex-col content-center">
                            <h1 className="text-center text-xl">Clientes</h1>
                            <h3 className="text-center text-7xl mt-4">10</h3>
                        </div>
                        <div className="bg-background-surface h-60 w-60 rounded-lg shadow-md flex-col content-center"></div>
                    </div>
                    <div className="bg-background-surface h-60 w-full shadow-md rounded-lg px-24 mt-6"></div>
                </div>
            </div>
        </>
    )
}

export default Home;