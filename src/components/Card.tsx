

const Card = () => {
    return (
        <>
            <div className="bg-background-surface rounded-md shadow-md w-60 h-72 mx-auto flex flex-col transition delay-150 ease-linear hover:-translate-y-1 hover:scale-110">
                <div className="text-center py-6 border-b border-gray-500 mx-4">
                    <h3 className="text-4xl">Test</h3>
                </div>
                <div className="text-center my-auto">
                    <h1 className="text-6xl">10</h1>
                </div>
            </div>
        </>
    )
}

export default Card;