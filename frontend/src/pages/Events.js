import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function Events() {
  const data = useLoaderData();
  // if(data.error){
  //   return <p>{data.message}</p>
  // }
  const events = data.events;
  return <EventsList events={events} />;
}

export default Events;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {error : true , message:'could not fetch the events'}
    // eslint-disable-next-line 
    throw { message : 'could not fetch'}
  } else {
   return response;
  }
};
