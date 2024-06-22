import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetails = () => {
    const data = useRouteLoaderData('event-details');
    return <EventItem event={data.event}/>
}
export default EventDetails;

export const loader = async({request,params}) => {
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if(!response.ok){
        throw json({message:'Could not fetch'},{status:500})
    }else{
        return response;
    }
} 

export const actions = async ({request,params}) => {
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`,{
        method:request.method,
    });
    if(!response.ok){
        throw json({message:'Could not Delete event'},{status:500})
    }
    return redirect('/events');
}
