"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { FadeInStagger, FadeInItem } from "@/components/FadeInSection";

export default function ContactSection() {
  const { isDark, prefersReducedMotion } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Mobile Game",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Failed to post message to /api/messages", err);
    }

    setStatus("sent");

    if (!prefersReducedMotion) {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.72 },
        colors: ["#4361EE", "#7B2FF7", "#FF6B6B", "#01ACB2"],
      });
    }

    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        projectType: "Mobile Game",
        message: "",
      });
      setStatus("idle");
    }, 4200);
  };

  return (
    <section
      id="contact"
      aria-label="Send a Signal Contact Form"
      className={`py-24 transition-colors sm:py-28 ${
        isDark ? "bg-[#0F0F1A]" : "bg-[#FFFFFF]"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger>
          <FadeInItem>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#4361EE]">
                Start Co-Op Mode
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Send a Signal 📡
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B7280] sm:text-base dark:text-gray-400">
                Have a game concept, VR medical training initiative, or
                co-development quest? Drop a signal below or email us directly at{" "}
                <a
                  href="mailto:azymar03@gmail.com"
                  className="font-semibold text-[#4361EE] underline underline-offset-4 hover:text-[#3651d4]"
                >
                  azymar03@gmail.com
                </a>
                .
              </p>
            </div>
          </FadeInItem>

          <FadeInItem>
            <form
              onSubmit={handleSubmit}
              className={`mt-12 space-y-6 rounded-3xl border p-6 shadow-sm sm:p-10 ${
                isDark
                  ? "border-white/15 bg-[#171728]"
                  : "border-gray-200/90 bg-[#FAFAFA]"
              }`}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Floating Label: Name */}
                <div className="relative">
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder=" "
                    className={`peer block w-full rounded-xl border px-4 pb-2.5 pt-6 text-sm outline-none transition focus:border-[#4361EE] focus:ring-4 focus:ring-[#4361EE]/15 ${
                      isDark
                        ? "border-white/15 bg-[#0F0F1A] text-white"
                        : "border-gray-200 bg-white text-[#1A1A2E]"
                    }`}
                  />
                  <label
                    htmlFor="contact-name"
                    className="pointer-events-none absolute left-4 top-2 origin-[0] text-[11px] font-semibold text-[#4361EE] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#6B7280] peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#4361EE]"
                  >
                    Your Name
                  </label>
                </div>

                {/* Floating Label: Email */}
                <div className="relative">
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder=" "
                    className={`peer block w-full rounded-xl border px-4 pb-2.5 pt-6 text-sm outline-none transition focus:border-[#4361EE] focus:ring-4 focus:ring-[#4361EE]/15 ${
                      isDark
                        ? "border-white/15 bg-[#0F0F1A] text-white"
                        : "border-gray-200 bg-white text-[#1A1A2E]"
                    }`}
                  />
                  <label
                    htmlFor="contact-email"
                    className="pointer-events-none absolute left-4 top-2 origin-[0] text-[11px] font-semibold text-[#4361EE] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#6B7280] peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#4361EE]"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Project Type Dropdown with Floating Label */}
              <div className="relative">
                <select
                  id="contact-project-type"
                  value={form.projectType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      projectType: e.target.value,
                    }))
                  }
                  className={`block w-full rounded-xl border px-4 pb-2.5 pt-6 text-sm outline-none transition focus:border-[#4361EE] focus:ring-4 focus:ring-[#4361EE]/15 ${
                    isDark
                      ? "border-white/15 bg-[#0F0F1A] text-white"
                      : "border-gray-200 bg-white text-[#1A1A2E]"
                  }`}
                >
                  <option value="Mobile Game">Mobile Game</option>
                  <option value="PC/Console">PC/Console</option>
                  <option value="VR">VR</option>
                  <option value="Other">Other</option>
                </select>
                <label
                  htmlFor="contact-project-type"
                  className="pointer-events-none absolute left-4 top-2 text-[11px] font-semibold text-[#4361EE]"
                >
                  Project Type
                </label>
              </div>

              {/* Floating Label: Message Textarea */}
              <div className="relative">
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder=" "
                  className={`peer block w-full resize-none rounded-xl border px-4 pb-3 pt-6 text-sm outline-none transition focus:border-[#4361EE] focus:ring-4 focus:ring-[#4361EE]/15 ${
                    isDark
                      ? "border-white/15 bg-[#0F0F1A] text-white"
                      : "border-gray-200 bg-white text-[#1A1A2E]"
                  }`}
                />
                <label
                  htmlFor="contact-message"
                  className="pointer-events-none absolute left-4 top-2 origin-[0] text-[11px] font-semibold text-[#4361EE] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#6B7280] peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#4361EE]"
                >
                  Tell us about your world, timeline &amp; target platforms...
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Submit contact form"
                className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4361EE] focus-visible:ring-offset-2 sm:text-base ${
                  status === "sent"
                    ? "bg-emerald-600"
                    : "bg-[#4361EE] hover:scale-[1.01] hover:bg-[#3552d4] hover:shadow-lg"
                }`}
              >
                {status === "loading" && (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Transmitting Signal...</span>
                  </>
                )}
                {status === "sent" && <span>Message Sent! ✅</span>}
                {status === "idle" && <span>Launch 🚀</span>}
              </button>
            </form>
          </FadeInItem>
        </FadeInStagger>
      </div>
    </section>
  );
}
