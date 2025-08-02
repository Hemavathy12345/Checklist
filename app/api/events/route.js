import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const body = await req.json();
    const checklist = body.checklist || [];

    await client.connect();
    const db = client.db("eventDB");
    const collection = db.collection("events");
    const result = await collection.insertOne({ ...body, checklist });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await client.connect();
    const db = client.db("eventDB");
    const collection = db.collection("events");
    const events = await collection.find({}).toArray();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
