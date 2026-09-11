import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { fallbackStore, MessageData, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";
import { sendContactNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (Name, Email, Subject, Message) are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const newMessage: MessageData = {
      _id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    fallbackStore.messages.unshift(newMessage);
    saveStore();

    const db = await connectDB();
    if (db) {
      await Message.create({
        name: newMessage.name,
        email: newMessage.email,
        subject: newMessage.subject,
        message: newMessage.message,
        read: false,
      });
    }

    // Dispatch real-time notification email directly to personal Gmail
    sendContactNotificationEmail({
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject,
      message: newMessage.message,
    }).catch((emailErr) => {
      console.warn("[Contact Email Background Error]:", emailErr);
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. I will get back to you soon.",
    });
  } catch (error: any) {
    console.error("Contact message error:", error);
    return NextResponse.json(
      { error: "An error occurred while sending your message. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const db = await connectDB();
    if (db) {
      const messages = await Message.find().sort({ createdAt: -1 });
      if (messages && messages.length > 0) {
        return NextResponse.json({ messages });
      }
    }

    return NextResponse.json({ messages: fallbackStore.messages });
  } catch (error: any) {
    return NextResponse.json({ messages: fallbackStore.messages });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    fallbackStore.messages = fallbackStore.messages.filter((m) => m._id !== id);
    saveStore();

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Message.findByIdAndDelete(id);
    }

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
