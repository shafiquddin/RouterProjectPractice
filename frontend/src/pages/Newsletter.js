import NewsltterSignup from '../components/NewsletterSignup'
import PageContent from '../components/PageContent';

const Newsletter = () => {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsltterSignup />
    </PageContent>
  );
}

export default Newsletter;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup successful!' };
}