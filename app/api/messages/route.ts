import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "messages.json");

function ensureDirectoryAndFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    const initialSample: ContactMessage[] = [
      {
        id: "msg-101",
        name: "Devon Clark",
        email: "devon@playstream.io",
        projectType: "Mobile Game",
        message: "We love AZYMAR Playground! We'd like to license two runner games and discuss a custom endless-runner build for our cross-platform launcher.",
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
        read: false,
      },
      {
        id: "msg-102",
        name: "Dr. Evelyn Reed",
        email: "evelyn.reed@medspatial.org",
        projectType: "VR/AR Project",
        message: "Looking to collaborate on expanding the 3D surgical instrument model and haptic feedback module for an orthopedic residency program in Boston.",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        read: false,
      },
      {
        id: "msg-103",
        name: "Aravind Mohan",
        email: "aravind@chronicleforge.com",
        projectType: "Full-Cycle Game Dev",
        message: "Inquiring about co-development timelines for Murugan: Surasamharam. We want to publish and distribute across SEA mobile gaming markets.",
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
        read: true,
      },
    ];
    fs.writeFileSync(filePath, JSON.stringify(initialSample, null, 2), "utf-8");
  }
}

function getMessages(): ContactMessage[] {
  ensureDirectoryAndFile();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as ContactMessage[];
  } catch {
    return [];
  }
}

function saveMessages(messages: ContactMessage[]) {
  ensureDirectoryAndFile();
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf-8");
}

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const messages = getMessages();
    const newMessage: ContactMessage = {
      id: "msg-" + Date.now(),
      name,
      email,
      projectType: projectType || "General Inquiry",
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    messages.unshift(newMessage);
    saveMessages(messages);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    const messages = getMessages();
    const target = messages.find((m) => m.id === id);
    if (target) {
      target.read = read !== undefined ? Boolean(read) : true;
      saveMessages(messages);
    }

    return NextResponse.json({ success: true, message: target });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    let messages = getMessages();
    messages = messages.filter((m) => m.id !== id);
    saveMessages(messages);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

