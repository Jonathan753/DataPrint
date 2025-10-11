interface Props {
    data: string;
    info: string;
}

const ViewData = ({ data = "", info }: Props) => {
    return (
        <>
            <div className="flex">
                <p className="font-medium">{info}</p>
                <p className="text-text-primary col-span-4 ml-1">{data}</p>
            </div>
        </>
    )
}

export default ViewData;