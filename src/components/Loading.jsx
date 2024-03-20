import { PuffLoader } from "react-spinners"


const Loading = () => {
    return (
        <div className="loading">
            <PuffLoader size={100} color="#0cdb39" />
        </div>
    )
}

export default Loading