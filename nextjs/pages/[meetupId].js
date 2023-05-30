import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props) {
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name="description"
					content={props.meetupData.description}
				></meta>
			</Head>
			<MeetupDetail
				title={props.meetupData.title}
				image={props.meetupData.image}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL);
	const db = client.db();
	const meetupCollection = db.collection("meetups");
	const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: "blocking",
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB_URL);
	const db = client.db();
	const meetupCollection = db.collection("meetups");
	const selectedMeeetup = await meetupCollection.findOne({
		_id: new ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeeetup._id.toString(),
				title: selectedMeeetup.title,
				image: selectedMeeetup.image,
				address: selectedMeeetup.address,
				description: selectedMeeetup.description,
			},
		},
	};
}

export default MeetupDetails;
