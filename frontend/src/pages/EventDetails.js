import {
  useRouteLoaderData,
  json,
  redirect,
  Await,
  defer,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EventDetails = () => {
  const { events, event } = useRouteLoaderData("event-details");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <Await resolve={event}>
          {(eventLoaded) => <EventItem event={eventLoaded} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
};
export default EventDetails;

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw json({ message: "Could not fetch" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  return defer({
    event: loadEvent(id),
    events: loadEvents()
  });
};

export const actions = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not Delete event" }, { status: 500 });
  }
  return redirect("/events");
};
