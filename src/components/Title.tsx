interface Props {
    title: string,
    subtitle?: string
}
const Title = ({ title, subtitle }: Props) => {
    return (
        <>
            <div className="mb-2">
                <h1 className="text-5xl text-indigo-950">{title}</h1>
            </div>
            <hr className="border-2 border-indigo-950" />
            <p className="text-indigo-800 pt-1">{subtitle}</p>
        </>
    )
}

export default Title;