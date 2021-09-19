import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from 'react';
function Homepage(props) {
  
  return <Fragment> 
    <Head>
      <title>Meat apps</title>
      <meta name="description" content='Browse history of your meetups with friend using react' /> 
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>
}

export async function getStaticProps() {
  // fetch('/api/meetups')
  const client = await MongoClient.connect('mongodb+srv://Programmer:lmoments262@api.utd89.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups'); 
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return{
    props:{
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 10
  };
};

export default Homepage;
