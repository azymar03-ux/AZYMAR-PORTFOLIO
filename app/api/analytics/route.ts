import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "analytics.json");

export interface StudioAnalytics {
  totalVisitors: number;
  miniGamePlays: number;
  highestMiniGameScore: number;
  playgroundClicks: number;
  doctor3DViews: number;
  signalsReceived: number;
  recentActivity: { id: string; action: string; timestamp: string; detail: string }[];
}

const defaultAnalytics: StudioAnalytics = {
  totalVisitors: 1420,
  miniGamePlays: 894,
  highestMiniGameScore: 42,
  playgroundClicks: 612,
  doctor3DViews: 388,
  signalsReceived: 12,
  recentActivity: [
    {
      id: "act-1",
      action: "Playground Visit",
      detail: "User redirected to azymar.me",
      timestamp: "Just now",
    },
    {
      id: "act-2",
      action: "Mini-Game Run",
      detail: "Player completed session with score 28",
      timestamp: "12m ago",
    },
    {
      id: "act-3",
      action: "Doctor 3D Inspected",
      detail: "User opened the 3D surgical doctor viewer",
      timestamp: "45m ago",
    },
    {
      id: "act-4",
      action: "Signal Dispatched",
      detail: "New co-development query submitted",
      timestamp: "2h ago",
    },
  ],
};

function ensureFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultAnalytics, null, 2), "utf-8");
  }
}

export async function GET() {
  try {
    ensureFile();
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ success: true, analytics: JSON.parse(data) });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const body = await req.json();
    const { action, detail } = body;

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as StudioAnalytics;

    if (action === "minigame_play") data.miniGamePlays += 1;
    if (action === "playground_click") data.playgroundClicks += 1;
    if (action === "doctor_view") data.doctor3DViews += 1;
    if (action === "signal") data.signalsReceived += 1;

    if (body.score && body.score > data.highestMiniGameScore) {
      data.highestMiniGameScore = body.score;
    }

    if (action && detail) {
      data.recentActivity.unshift({
        id: "act-" + Date.now(),
        action,
        detail,
        timestamp: "Just now",
      });
      if (data.recentActivity.length > 8) data.recentActivity.pop();
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true, analytics: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
