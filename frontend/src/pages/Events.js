import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function Events() {
  const events = useLoaderData();
  return <EventsList events={events} />;
}

export default Events;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // error
  } else {
    const resData = await response.json();
    return resData.events;
  }
};
