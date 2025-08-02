import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    await client.connect();
    const db = client.db("eventDB");
    const collection = db.collection("events");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { checklist: body.checklist } }
    );

    return NextResponse.json({ success: true, updatedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
