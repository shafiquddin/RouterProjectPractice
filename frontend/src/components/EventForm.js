import { useNavigate,Form, useNavigation,useActionData,json,redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'loading';

  function cancelHandler() {
    navigate('..');
  }

  // const changeHandler = (identifier,value) => {
  //   setEventData(preState => {
  //     return {
  //       ...preState,
  //       [identifier]:value
  //     }
  //   })
  // }

  return (
    <Form className={classes.form} method = {method}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err} >{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={ event && event.title} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event && event.image} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event && event.date}required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={ event && event.description} rows="5" required />
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const actions = async ({request,params}) => {
  const method = request.method;
  
  const data = await request.formData();
  const eventData = Object.fromEntries(data.entries());

  let url = 'http://localhost:8080/events';

  if(method === 'PATCH'){
    const eventId = params.eventId;
    url =  'http://localhost:8080/events/'+eventId
  }

  const response = await fetch(url,{
      method:method,
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(eventData),
  })

  if(response.status === 422){
      return response;
  }

  if(!response.ok){
      throw json({message:'Could not send the events'},{status:500})
  }
  return redirect('/events')
}
