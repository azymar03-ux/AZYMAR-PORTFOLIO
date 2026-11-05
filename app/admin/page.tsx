"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Filter,
  Inbox,
  Mail,
  Moon,
  RefreshCw,
  Search,
  Sun,
  Tag,
  Trash2,
  ExternalLink,
  Gamepad2,
  Boxes,
  Users,
  Activity,
  BarChart3,
  Flame,
  Eye,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { TEAM_PARTY } from "@/data/portfolioData";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

interface ProjectStatusItem {
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

interface StudioAnalytics {
  totalVisitors: number;
  miniGamePlays: number;
  highestMiniGameScore: number;
  playgroundClicks: number;
  doctor3DViews: number;
  signalsReceived: number;
  recentActivity: { id: string; action: string; timestamp: string; detail: string }[];
}

export default function AdminMessagesPage() {
  const { isDark, toggleDarkMode } = useTheme();

  // Navigation sub-tabs
  const [adminView, setAdminView] = useState<"inbox" | "projects" | "analytics" | "party">("inbox");

  // Inbox State
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  // Projects State
  const [projects, setProjects] = useState<ProjectStatusItem[]>([]);
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(null);

  // Analytics State
  const [analytics, setAnalytics] = useState<StudioAnalytics | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Messages
      const resMsg = await fetch("/api/messages");
      const dataMsg = await resMsg.json();
      if (dataMsg.success && Array.isArray(dataMsg.messages)) {
        setMessages(dataMsg.messages);
      }

      // 2. Projects
      const resProj = await fetch("/api/projects");
      const dataProj = await resProj.json();
      if (dataProj.success && Array.isArray(dataProj.projects)) {
        setProjects(dataProj.projects);
      }

      // 3. Analytics
      const resAnal = await fetch("/api/analytics");
      const dataAnal = await resAnal.json();
      if (dataAnal.success) {
        setAnalytics(dataAnal.analytics);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Update Project Progress & Status
  const handleUpdateProject = async (id: string, updates: Partial<ProjectStatusItem>) => {
    setUpdatingProjectId(id);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...data.project } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProjectId(null);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus?: boolean) => {
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: !currentStatus } : m))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message box?")) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const categories = [
    "All",
    "Mobile Game",
    "Full-Cycle Game Dev",
    "VR/AR Project",
    "Web Arcade / HTML5",
  ];

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase()) ||
      msg.projectType.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedFilter === "All" || msg.projectType === selectedFilter;

    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "unread"
        ? !msg.read
        : Boolean(msg.read);

    return matchesSearch && matchesCategory && matchesTab;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#0F0F1A] text-white" : "bg-[#F8F9FA] text-[#1A1A2E]"
      }`}
    >
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark
            ? "border-white/10 bg-[#0F0F1A]/90 text-white"
            : "border-gray-200 bg-white/90 text-[#1A1A2E]"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-[#4361EE] hover:text-[#4361EE] ${
                isDark
                  ? "border-white/15 bg-white/5 text-white"
                  : "border-gray-200 bg-white text-[#1A1A2E]"
              }`}
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <img
                src="/images/brand/azymar-logo.png"
                alt="AZYMAR"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-lg font-bold tracking-tight">
                AZYMAR Admin
              </span>
              <span className="rounded-full bg-[#4361EE]/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#4361EE]">
                Production Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition hover:border-[#4361EE] hover:text-[#4361EE] ${
                isDark
                  ? "border-white/10 bg-white/5 text-gray-300"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={fetchAllData}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                isDark
                  ? "border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black"
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4361EE] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#3651d4]"
            >
              Portfolio
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-2 pt-1 sm:px-6 lg:px-8">
          <button
            onClick={() => setAdminView("inbox")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              adminView === "inbox"
                ? "bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/20"
                : isDark
                ? "text-gray-400 hover:bg-white/5 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Inbox className="h-4 w-4" />
            Signals &amp; Inbox
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#FF6B6B] px-1.5 py-0.2 font-mono text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminView("projects")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              adminView === "projects"
                ? "bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/20"
                : isDark
                ? "text-gray-400 hover:bg-white/5 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Gamepad2 className="h-4 w-4" />
            Game Titles &amp; Rigs
          </button>

          <button
            onClick={() => setAdminView("analytics")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              adminView === "analytics"
                ? "bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/20"
                : isDark
                ? "text-gray-400 hover:bg-white/5 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Activity className="h-4 w-4" />
            Live Arcade Telemetry
          </button>

          <button
            onClick={() => setAdminView("party")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              adminView === "party"
                ? "bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/20"
                : isDark
                ? "text-gray-400 hover:bg-white/5 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Users className="h-4 w-4" />
            The Party Roster ({TEAM_PARTY.length})
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* VIEW 1: SIGNALS & INBOX                                  */}
        {/* ======================================================== */}
        {adminView === "inbox" && (
          <div>
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={`rounded-2xl border p-5 shadow-sm transition-colors ${
                  isDark
                    ? "border-white/10 bg-[#171728]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Total Signals
                  </span>
                  <Inbox className="h-4 w-4 text-[#4361EE]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold tracking-tight">
                  {messages.length}
                </div>
                <p className="mt-1 text-xs text-[#6B7280]">Received inquiries</p>
              </div>

              <div
                className={`rounded-2xl border p-5 shadow-sm transition-colors ${
                  isDark
                    ? "border-white/10 bg-[#171728]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Unread Messages
                  </span>
                  <Mail className="h-4 w-4 text-[#FF6B6B]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold tracking-tight text-[#FF6B6B]">
                  {unreadCount}
                </div>
                <p className="mt-1 text-xs text-[#6B7280]">Pending review</p>
              </div>

              <div
                className={`rounded-2xl border p-5 shadow-sm transition-colors ${
                  isDark
                    ? "border-white/10 bg-[#171728]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Completed
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold tracking-tight text-[#22C55E]">
                  {messages.length - unreadCount}
                </div>
                <p className="mt-1 text-xs text-[#6B7280]">Handled &amp; archived</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div
              className={`mt-8 flex flex-col gap-4 rounded-2xl border p-4 transition-colors lg:flex-row lg:items-center lg:justify-between ${
                isDark
                  ? "border-white/10 bg-[#171728]"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Tabs */}
              <div
                className={`flex items-center gap-1.5 rounded-xl border p-1 text-xs ${
                  isDark
                    ? "border-white/10 bg-[#0F0F1A]"
                    : "border-gray-200 bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setActiveTab("all")}
                  className={`rounded-lg px-3.5 py-1.5 font-medium transition ${
                    activeTab === "all"
                      ? "bg-[#4361EE] text-white shadow-sm"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  All ({messages.length})
                </button>
                <button
                  onClick={() => setActiveTab("unread")}
                  className={`rounded-lg px-3.5 py-1.5 font-medium transition ${
                    activeTab === "unread"
                      ? "bg-[#FF6B6B] text-white shadow-sm"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setActiveTab("read")}
                  className={`rounded-lg px-3.5 py-1.5 font-medium transition ${
                    activeTab === "read"
                      ? "bg-[#22C55E] text-white shadow-sm"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Read ({messages.length - unreadCount})
                </button>
              </div>

              {/* Search + Category Dropdown */}
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, keyword..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full rounded-xl border py-2 pl-10 pr-4 text-xs outline-none transition focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/20 ${
                      isDark
                        ? "border-white/10 bg-[#0F0F1A] text-white placeholder-gray-500"
                        : "border-gray-200 bg-gray-50 text-[#1A1A2E] placeholder-gray-400"
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className={`rounded-xl border px-3 py-2 text-xs outline-none transition focus:border-[#4361EE] ${
                      isDark
                        ? "border-white/10 bg-[#0F0F1A] text-white"
                        : "border-gray-200 bg-gray-50 text-[#1A1A2E]"
                    }`}
                  >
                    {categories.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className={isDark ? "bg-[#171728] text-white" : "bg-white text-black"}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message Boxes Grid */}
            <div className="mt-6">
              {loading ? (
                <div
                  className={`flex flex-col items-center justify-center rounded-3xl border py-20 text-center ${
                    isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                  }`}
                >
                  <RefreshCw className="h-8 w-8 animate-spin text-[#4361EE]" />
                  <p className="mt-3 text-sm text-gray-400">Loading incoming messages...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div
                  className={`flex flex-col items-center justify-center rounded-3xl border py-20 text-center ${
                    isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                  }`}
                >
                  <Inbox className="h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 font-display text-lg font-bold">No Messages Found</h3>
                  <p className="mt-1 max-w-sm text-xs text-gray-400">
                    {search || selectedFilter !== "All" || activeTab !== "all"
                      ? "Try adjusting your search query or category filters."
                      : "All inquiries submitted through 'Send a Signal' will show up here as interactive boxes."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMessages.map((msg) => {
                    const formattedDate = new Date(msg.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                    return (
                      <div
                        key={msg.id}
                        className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                          isDark
                            ? msg.read
                              ? "border-white/10 bg-[#171728] opacity-85 hover:opacity-100"
                              : "border-[#4361EE]/50 bg-[#171728] shadow-lg shadow-[#4361EE]/5"
                            : msg.read
                            ? "border-gray-200 bg-white opacity-90 hover:opacity-100 shadow-sm"
                            : "border-[#4361EE]/40 bg-white shadow-md shadow-[#4361EE]/10"
                        }`}
                      >
                        {/* Unread Accent Strip */}
                        {!msg.read && (
                          <span className="absolute -left-px top-6 h-8 w-1 rounded-r-md bg-[#4361EE]" />
                        )}

                        <div>
                          {/* Box Header: Tag & Date */}
                          <div
                            className={`flex items-center justify-between gap-2 border-b pb-4 ${
                              isDark ? "border-white/10" : "border-gray-100"
                            }`}
                          >
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#4361EE]/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#4361EE]">
                              <Tag className="h-3 w-3" />
                              {msg.projectType}
                            </span>
                            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
                              <Clock className="h-3 w-3" />
                              {formattedDate}
                            </div>
                          </div>

                          {/* Sender Info Box */}
                          <div className="mt-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#4361EE] to-[#7B2FF7] font-display text-sm font-bold text-white shadow-sm">
                              {msg.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate font-display text-base font-bold">
                                {msg.name}
                              </h4>
                              <a
                                href={`mailto:${msg.email}`}
                                className="inline-flex items-center gap-1 truncate text-xs text-gray-500 transition hover:text-[#4361EE] dark:text-gray-400"
                              >
                                <Mail className="h-3 w-3 shrink-0" />
                                <span className="truncate">{msg.email}</span>
                              </a>
                            </div>
                          </div>

                          {/* Content Box */}
                          <div
                            className={`mt-4 rounded-xl border p-4 ${
                              isDark
                                ? "border-white/5 bg-[#0F0F1A] text-gray-300"
                                : "border-gray-100 bg-[#FAFAFA] text-gray-700"
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-xs leading-relaxed">
                              {msg.message}
                            </p>
                          </div>
                        </div>

                        {/* Box Actions Footer */}
                        <div
                          className={`mt-6 flex items-center justify-between border-t pt-4 ${
                            isDark ? "border-white/10" : "border-gray-100"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleReadStatus(msg.id, msg.read)}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                              msg.read
                                ? isDark
                                ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                : "bg-[#4361EE]/15 text-[#4361EE] hover:bg-[#4361EE] hover:text-white"
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {msg.read ? "Mark Unread" : "Mark as Read"}
                          </button>

                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=Reply from AZYMAR regarding ${encodeURIComponent(
                                msg.projectType
                              )}`}
                              className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition hover:border-[#4361EE] ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                                  : "border-gray-200 bg-white text-gray-700 hover:text-black shadow-sm"
                              }`}
                              title="Reply directly via Email"
                            >
                              Reply
                            </a>
                            <button
                              type="button"
                              onClick={() => deleteMessage(msg.id)}
                              aria-label="Delete message"
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-gray-400"
                                  : "border-gray-200 bg-white text-gray-500 shadow-sm"
                              }`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: GAME TITLES & XR RIGS CONTROLLER                 */}
        {/* ======================================================== */}
        {adminView === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  Game Titles &amp; XR Status
                </h3>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Real-time pipeline controls for Murugan Action RPG, VR Surgical Sim, Verity &amp; Playground.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`rounded-2xl border p-6 transition-all ${
                    isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">
                        {proj.category}
                      </span>
                      <h4 className="mt-1 font-display text-xl font-bold">{proj.title}</h4>
                      <p className="text-xs text-gray-400">{proj.engine}</p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase ${
                        proj.status === "Completed"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-amber-500/15 text-amber-500"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  {/* Progress Bar Controller */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-400">Milestone Completion</span>
                      <span className="font-mono text-[#4361EE]">{proj.progressPercent}%</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                      <div
                        style={{ width: `${proj.progressPercent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#4361EE] to-[#7B2FF7] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="mt-4 rounded-xl border border-white/5 bg-[#0F0F1A] p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pipeline Note:</span>
                      <span className="font-mono text-gray-300">{proj.statusLabel}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                      <span className="text-gray-400">Target Benchmark:</span>
                      <span className="font-mono text-emerald-400">{proj.targetFPS}</span>
                    </div>
                  </div>

                  {/* Quick Admin Toggles */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={updatingProjectId === proj.id}
                        onClick={() =>
                          handleUpdateProject(proj.id, {
                            status: proj.status === "Completed" ? "Ongoing" : "Completed",
                            progressPercent: proj.status === "Completed" ? 85 : 100,
                          })
                        }
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-[#4361EE] hover:text-white"
                      >
                        Toggle {proj.status === "Completed" ? "Ongoing" : "Completed"}
                      </button>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-[#4361EE]/15 px-3 py-1.5 text-xs font-semibold text-[#4361EE] hover:bg-[#4361EE] hover:text-white transition"
                        >
                          Visit Live <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <span className="font-mono text-[10px] text-gray-400">
                      Sync: {proj.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: LIVE ARCADE & TELEMETRY                          */}
        {/* ======================================================== */}
        {adminView === "analytics" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  Studio &amp; Player Telemetry
                </h3>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Live counters from the interactive in-browser canvas game, 3D Doctor viewer, and azymar.me redirects.
                </p>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase">Mini-Game Runs</span>
                  <Gamepad2 className="h-4 w-4 text-[#4361EE]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold">
                  {analytics?.miniGamePlays || 0}
                </div>
                <p className="mt-1 text-xs text-emerald-400">+18% this session</p>
              </div>

              <div
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase">Top Score</span>
                  <Flame className="h-4 w-4 text-[#FF6B6B]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-[#FF6B6B]">
                  {analytics?.highestMiniGameScore || 0} pts
                </div>
                <p className="mt-1 text-xs text-gray-400">In-browser reflex record</p>
              </div>

              <div
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase">Playground Traffic</span>
                  <ExternalLink className="h-4 w-4 text-[#7B2FF7]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-[#7B2FF7]">
                  {analytics?.playgroundClicks || 0}
                </div>
                <p className="mt-1 text-xs text-gray-400">azymar.me clicks</p>
              </div>

              <div
                className={`rounded-2xl border p-5 ${
                  isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase">3D Doctor Views</span>
                  <Eye className="h-4 w-4 text-[#01ACB2]" />
                </div>
                <div className="mt-3 font-display text-3xl font-bold text-[#01ACB2]">
                  {analytics?.doctor3DViews || 0}
                </div>
                <p className="mt-1 text-xs text-gray-400">Interactive WebGL rigs</p>
              </div>
            </div>

            {/* Live Activity Stream */}
            <div
              className={`rounded-2xl border p-6 ${
                isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white"
              }`}
            >
              <h4 className="font-display text-base font-bold">Recent Telemetry Feed</h4>
              <div className="mt-4 space-y-3">
                {analytics?.recentActivity.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0F0F1A] p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <span className="font-semibold text-white">{act.action}</span>
                        <p className="text-gray-400">{act.detail}</p>
                      </div>
                    </div>
                    <span className="font-mono text-gray-500">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: THE PARTY ROSTER                                 */}
        {/* ======================================================== */}
        {adminView === "party" && (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  The Party Roster &amp; BOD Guild
                </h3>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Core Founders, Board of Directors, and Staff Engineers profile ledger.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM_PARTY.map((member) => (
                <div
                  key={member.name}
                  className={`flex items-center gap-4 rounded-2xl border p-5 ${
                    isDark ? "border-white/10 bg-[#171728]" : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-16 w-16 rounded-full border-2 border-white object-cover object-center shadow-md dark:border-[#0F0F1A]"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#4361EE] to-[#7B2FF7] font-display text-lg font-bold text-white shadow-sm">
                      {member.initials}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4361EE]">
                      {member.rpgClass}
                    </span>
                    <h4 className="truncate font-display text-base font-bold">{member.name}</h4>
                    <p className="truncate text-xs text-gray-400">{member.role}</p>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#4361EE] hover:underline"
                    >
                      LinkedIn Profile <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
