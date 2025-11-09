import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid form data",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    let tags = JSON.parse(formData.get("tags") as string);
    let agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvent",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error creating event",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error fetching events",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
