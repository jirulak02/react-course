import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

import MeetupList from "@/components/meetups/MeetupList";

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Brows a huge list of highly active React meetups!"
				></meta>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL);
	const db = client.db();
	const meetupCollection = db.collection("meetups");
	const meetups = await meetupCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
