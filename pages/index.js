import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head  from 'next/head';
import { Fragment } from 'react';


function HomePage(props) {
  return (
  <Fragment>
    <Head>
    <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
    </Head>
  <MeetupList meetups={props.meetups} />;
  </Fragment>
  )
}

export async function getStaticProps() {
  
  const client = await MongoClient.connect("mongodb+srv://geronimosovrano:hom3sweet@cluster0.m9xqsad.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db(); 

  const meetupsCollection = db.collection("meetups")

   const meetups =  await meetupsCollection.find().toArray(); 

client.close()

return {
  props: {
    meetups: meetups.map((meetup) => ({
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      id: meetup._id.toString(),
    })),
  },
  revalidate: 1,
};
}
export default HomePage;
