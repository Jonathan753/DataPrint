interface Props {
    data: string;
    info: string;
}

const ViewData = ({ data = "", info }: Props) => {
    return (
        <>
            <div className="flex">
                <p>{info}</p>
                <p className="text-red-900 col-span-4">{data}</p>
            </div>
        </>
    )
}

export default ViewData;