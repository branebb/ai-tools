import connectMongoDB from "@/lib/mongo/mongodb";
import dataSchema from "@/models/dataschema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { userId } = auth();

    const {title, type, prompt, answer} = await request.json();

    await connectMongoDB();

    await dataSchema.create({userId, title, type, prompt, answer});

    return NextResponse.json("Database insert successful!");
}

export async function GET()
{

    const { userId } = auth();
    await connectMongoDB();
    const data = await dataSchema.find({ userId });

    return NextResponse.json({ data })
}

export async function DELETE(request : any)
{
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await dataSchema.findByIdAndDelete(id);

    return NextResponse.json({messege: "Database entry deleted!"});
}

export async function PUT(request: Request) {
    const { id, title } = await request.json();

    await connectMongoDB();

    const updatedData = await dataSchema.findByIdAndUpdate(id, { title: title }, { new: true });

    return NextResponse.json({ message: "Data updated!", updatedData });
}