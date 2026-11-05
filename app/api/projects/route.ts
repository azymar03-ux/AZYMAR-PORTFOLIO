import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "projectStatus.json");

export interface ProjectStatusItem {
  id: string;
  title: string;
  category: string;
  status: "Completed" | "Ongoing";
  statusLabel: string;
  progressPercent: number;
  engine: string;
  targetFPS: string;
  liveUrl?: string;
  lastUpdated: string;
}

const defaultStatus: ProjectStatusItem[] = [
  {
    id: "azymar-playground",
    title: "AZYMAR Playground",
    category: "Web Arcade / Mobile",
    status: "Completed",
    statusLabel: "Completed · Live (azymar.me)",
    progressPercent: 100,
    engine: "HTML5 Canvas / WebGL",
    targetFPS: "60 FPS",
    liveUrl: "https://azymar.me",
    lastUpdated: "2026-11-02",
  },
  {
    id: "murugan-surasamharam",
    title: "Murugan: Surasamharam",
    category: "Action RPG",
    status: "Ongoing",
    statusLabel: "Ongoing · Boss Combat & Niagara VFX",
    progressPercent: 68,
    engine: "Unreal Engine 5 (C++)",
    targetFPS: "60 FPS (Mobile/PC)",
    lastUpdated: "2026-11-05",
  },
  {
    id: "vr-surgical-sim",
    title: "AZYMAR VR Surgical Sim",
    category: "Medical Spatial XR",
    status: "Ongoing",
    statusLabel: "Ongoing · 6DoF Haptics & Instrument Rigs",
    progressPercent: 74,
    engine: "Unity XR / OpenXR",
    targetFPS: "90 Hz Stereoscopic",
    lastUpdated: "2026-11-04",
  },
  {
    id: "verity-research",
    title: "Verity Systems",
    category: "Cryptographic Architecture",
    status: "Ongoing",
    statusLabel: "Ongoing · 21-Screen System & Ledger",
    progressPercent: 82,
    engine: "Next.js / WebCrypto API",
    targetFPS: "Zero-Latency Local",
    lastUpdated: "2026-11-03",
  },
];

function ensureFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultStatus, null, 2), "utf-8");
  }
}

export async function GET() {
  try {
    ensureFile();
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ success: true, projects: JSON.parse(data) });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    ensureFile();
    const body = await req.json();
    const { id, status, statusLabel, progressPercent, targetFPS } = body;

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as ProjectStatusItem[];
    const target = data.find((p) => p.id === id);

    if (target) {
      if (status) target.status = status;
      if (statusLabel) target.statusLabel = statusLabel;
      if (progressPercent !== undefined) target.progressPercent = Number(progressPercent);
      if (targetFPS) target.targetFPS = targetFPS;
      target.lastUpdated = new Date().toISOString().split("T")[0];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    return NextResponse.json({ success: true, project: target });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
