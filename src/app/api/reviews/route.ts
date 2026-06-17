import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request: Request) {
    const body = await request.json();
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db("handcraftedhavendb");
    await db.collection("reviews").insertOne({
        productId: body.productId,
        userName: body.userName,
        rating: body.rating,
        comment: body.comment,
        createdAt: new Date(),
    });
    await client.close();

    return NextResponse.json({
        success: true,
    });
}
