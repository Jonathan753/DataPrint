interface Props {
    title: string,
    subtitle?: string
}
const Title = ({ title, subtitle }: Props) => {
    return (
        <>
            <div className="mb-2">
                <h1 className="text-5xl text-text-primary">{title}</h1>
            </div>
            <hr className="border-slate-900" />
            <p className="text-text-secondary pt-1">{subtitle}</p>
        </>
    )
}

export default Title;