interface Props {
    title: string,
    subtitle?: string
}
const Title = ({ title, subtitle }: Props) => {
    return (
        <>
            <div className="mb-2">
                <h1 className="text-5xl text-white">{title}</h1>
            </div>
            <hr className="border border-zinc-300" />
            <p className="text-zinc-300 pt-1">{subtitle}</p>
        </>
    )
}

export default Title;