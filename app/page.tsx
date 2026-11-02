import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import FeaturedGames from "@/components/FeaturedGames";
import MiniGameSection from "@/components/MiniGameSection";
import AboutSection from "@/components/AboutSection";
import ServicesSkillTree from "@/components/ServicesSkillTree";
import TechInventory from "@/components/TechInventory";
import ProcessQuestLog from "@/components/ProcessQuestLog";
import TeamSection from "@/components/TeamSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function HomePage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        {/* SECTION 1 — HERO */}
        <HeroSection />

        {/* SECTION 2 — LOGO BAR */}
        <LogoBar />

        {/* SECTION 3 — FEATURED GAMES */}
        <FeaturedGames />

        {/* SECTION 4 — INTERACTIVE MINI GAME */}
        <MiniGameSection />

        {/* SECTION 5 — ABOUT + STATS */}
        <AboutSection />

        {/* SECTION 6 — SERVICES (Skill Tree Style) */}
        <ServicesSkillTree />

        {/* SECTION 7 — TECH STACK (Inventory Grid) */}
        <TechInventory />

        {/* SECTION 8 — PROCESS (Quest Log) */}
        <ProcessQuestLog />

        {/* SECTION 9 — TEAM */}
        <TeamSection />

        {/* SECTION 10 — CAREERS */}
        <CareersSection />

        {/* SECTION 11 — CONTACT */}
        <ContactSection />
      </main>

      {/* SECTION 13 — FOOTER */}
      <FooterSection />
    </SmoothScroll>
  );
}
