export const Banner = props => {
    return (
        <div role="alert" className={`border-t-4 rounded-b shadow-md px-3 py-3 ${props.status === "success" ? "bg-green-100 border-green-500 text-green-900" : props.status === "failure" ? "bg-red-100 border-red-500 text-red-900" : null}`}>
            <p className="font-bold">Status</p>
            <p className="text-sm">{props.info}</p>
        </div>
    )
}