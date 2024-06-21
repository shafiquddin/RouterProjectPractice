import { useParams } from "react-router-dom";

const EventDetails = () => {
    const params = useParams();
    return <>
     <h1>EventDetails</h1>
     <p>{params.eventId}</p>
    </>
}
export default EventDetails;