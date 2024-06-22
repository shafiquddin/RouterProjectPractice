import { redirect,json } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEvent = () => {
    return <EventForm/>
}
export default NewEvent;

export const actions = async ({request,params}) => {
    const data = await request.formData();
    const eventData = Object.fromEntries(data.entries());

    const response = await fetch('http://localhost:8080/events',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(eventData),
    })
    if(!response.ok){
        throw json({message:'Could not send the events'},{status:500})
    }
    return redirect('/events')
}