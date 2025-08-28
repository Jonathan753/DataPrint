interface teste {
    title: string
}
const Title = ({ title }: teste) => {
    return (
        <>
            <div>
                <h1 className="text-5xl">{title}</h1>
            </div>
        </>
    )
}

export default Title;