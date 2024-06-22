import { useNavigate,Form, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
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
    <Form className={classes.form} method = 'POST'>
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
