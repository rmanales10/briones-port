"use client";

import React, { useState, useEffect, useRef } from "react";

type CredentialCategory = "all" | "cpa" | "global" | "software";

interface Credential {
  id: string;
  category: "cpa" | "global" | "software";
  title: string;
  issuer: string;
  badge: string;
  icon: string;
  iconColor: string;
  idNumber: string;
  extraInfo: string;
}

const credentialsList: Credential[] = [
  {
    id: "cpa-ca",
    category: "cpa",
    title: "Certified Public Accountant (CPA)",
    issuer: "California Board of Accountancy",
    badge: "Verified & Active",
    icon: "verified",
    iconColor: "text-primary",
    idNumber: "License #CPA-148920",
    extraInfo: "Exp: Dec 2026",
  },
  {
    id: "cpa-ny",
    category: "cpa",
    title: "Certified Public Accountant (CPA)",
    issuer: "New York State Board for Public Accountancy",
    badge: "Verified & Active",
    icon: "verified",
    iconColor: "text-primary",
    idNumber: "License #NYS-092819",
    extraInfo: "Exp: Sep 2026",
  },
  {
    id: "cgma",
    category: "global",
    title: "Chartered Global Management Accountant",
    issuer: "AICPA & CIMA Joint Association",
    badge: "Verified & Active",
    icon: "public",
    iconColor: "text-tertiary",
    idNumber: "Designation #CGMA-7104",
    extraInfo: "Global Standing",
  },
  {
    id: "cma",
    category: "global",
    title: "Certified Management Accountant (CMA)",
    issuer: "Institute of Management Accountants (IMA)",
    badge: "Verified & Active",
    icon: "finance_chip",
    iconColor: "text-secondary",
    idNumber: "Certificate #59281",
    extraInfo: "Senior Member",
  },
  {
    id: "ea",
    category: "cpa",
    title: "IRS Enrolled Agent (EA)",
    issuer: "United States Department of the Treasury",
    badge: "Verified & Active",
    icon: "gavel",
    iconColor: "text-primary",
    idNumber: "EA License #00139420",
    extraInfo: "Unlimited Representation",
  },
  {
    id: "cfe",
    category: "global",
    title: "Certified Fraud Examiner (CFE)",
    issuer: "Association of Certified Fraud Examiners",
    badge: "Verified & Active",
    icon: "policy",
    iconColor: "text-error",
    idNumber: "CFE ID #982103",
    extraInfo: "Forensic Specialist",
  },
  {
    id: "qbo-adv",
    category: "software",
    title: "QuickBooks Online Advanced ProAdvisor",
    issuer: "Intuit Certified (Top 1% Tier Worldwide)",
    badge: "Diamond Status",
    icon: "diamond",
    iconColor: "text-primary",
    idNumber: "Enterprise Certified",
    extraInfo: "Master Tier",
  },
  {
    id: "netsuite",
    category: "software",
    title: "NetSuite Certified ERP Consultant",
    issuer: "Oracle NetSuite Financial Administration",
    badge: "Certified",
    icon: "hub",
    iconColor: "text-tertiary",
    idNumber: "NetSuite ERP #88391",
    extraInfo: "SuiteAnalytics Lead",
  },
  {
    id: "xero",
    category: "software",
    title: "Xero Certified Platinum Partner",
    issuer: "Xero Enterprise Migration Specialist",
    badge: "Platinum Partner",
    icon: "sync_alt",
    iconColor: "text-secondary",
    idNumber: "Partner Tier: 80+ Orgs",
    extraInfo: "API Custom Architect",
  },
];

// Reusable Scroll-Reveal Component
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let transformInitial = "translate-y-8 opacity-0";
  if (direction === "left") transformInitial = "-translate-x-8 opacity-0";
  if (direction === "right") transformInitial = "translate-x-8 opacity-0";
  if (direction === "scale") transformInitial = "scale-95 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100" : transformInitial
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Animated Number Counter on Viewport Entry
function CountUp({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easedProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CredentialCategory>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    revenueBand: "",
    ledgerStack: "",
    scope: "",
    context: "",
    ndaAgreed: false,
  });

  // Track scroll position for progress bar and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setShowBackToTop(totalScroll > 400);

      // Section spy
      const sections = ["intro", "about", "certifications", "experience", "tools", "samples", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCredentials = credentialsList.filter(
    (c) => selectedCategory === "all" || c.category === selectedCategory
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleDownloadCV = () => {
    setActiveModal("cv");
  };

  const handleInspectArtifact = (type: "cash-forecast" | "board-package") => {
    setActiveModal(type);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface relative">
      {/* SCROLL PROGRESS INDICATOR BAR */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-surface-dim z-[60] pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-tertiary to-secondary shadow-[0_0_12px_rgba(78,222,163,0.8)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/85 backdrop-blur-xl border-b border-surface-container-high/50 shadow-[0_1px_12px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="h-20 max-w-[1600px] mx-auto px-margin flex items-center justify-between gap-space-lg">
          {/* Logo & Brand */}
          <a href="#intro" className="flex items-center gap-space-md shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-headline-sm shadow-[0_0_15px_rgba(78,222,163,0.2)] group-hover:scale-105 group-hover:border-primary transition-all duration-200">
              RV
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md tracking-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                Vance Advisory
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                CPA &amp; Fiduciary Practice
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            {[
              { id: "about", label: "About & Ethos" },
              { id: "certifications", label: "Credentials" },
              { id: "experience", label: "Experience" },
              { id: "tools", label: "Systems & Stack" },
              { id: "samples", label: "Work Samples" },
              { id: "contact", label: "Work With Me" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-body-sm transition-all duration-200 relative py-1 ${
                  activeSection === item.id
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in-75 duration-200"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Header Action & Profile */}
          <div className="flex items-center gap-space-md shrink-0">
            <a
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-label-md tracking-tight hover:bg-primary transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:-translate-y-0.5"
              href="#contact"
            >
              Executive Consultation
            </a>

            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary group-hover:scale-105 transition-all shadow-md">
                <img
                  alt="Rayyan Vance, CPA"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UGZxywHo-iu_1tE1y98IjAYZpY39-LTa6q_08IJKJFXGp__dXcQf5chVyGWwvh4xnPtX_7uiY9tPbko82mBbTGlClyVGKrm7JXvlLWOkfPTzWVNIvS3NXfS0yHFHtUpL6roQmI34iAqEZ3UySDeAmI-uKwcGb_aQzAEp7gNkjJqHW25dabnD1PHj5LPRhnAf2DrKRNmasWoDsRu36_Fo5Ots7GbdKA9rb28bv0V0SvwSbHBfl6YFvLKc8"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface animate-pulse"></span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-headline-sm">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface-dim border-b border-surface-container-high px-margin py-space-md flex flex-col gap-space-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#about"
            >
              About &amp; Ethos
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#certifications"
            >
              Credentials &amp; Accreditations
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#experience"
            >
              Career &amp; Experience
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#tools"
            >
              Systems &amp; Stack
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#samples"
            >
              Case Studies &amp; Deliverables
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2"
              href="#contact"
            >
              Work With Me / Mandate Application
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-2.5 rounded-lg bg-primary text-on-primary font-semibold"
              href="#contact"
            >
              Book Discovery Consultation
            </a>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-surface">
        {/* SECTION 1: HERO & EXECUTIVE FINANCIAL PULSE */}
        <section className="relative w-full overflow-hidden pb-space-xl pt-space-lg" id="intro">
          {/* Ambient luminous gradients with floating animation */}
          <div className="pointer-events-none absolute -left-48 top-0 h-[550px] w-[550px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow"></div>
          <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-secondary/8 blur-[160px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Trust verification badge */}
            <Reveal delay={100}>
              <div className="mb-space-lg flex flex-wrap items-center gap-space-sm">
                <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-1 border border-primary/20 shadow-[0_0_15px_rgba(78,222,163,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">BOARD MANDATE ACTIVE</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">|</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Dual-State Active CPA: California (#148920) &amp; New York (#092819)
                </span>
                <span className="font-label-sm text-label-sm text-outline">|</span>
                <span className="font-label-sm text-label-sm text-secondary">AICPA Peer Review: Unmodified</span>
              </div>
            </Reveal>

            {/* Main Hero Grid */}
            <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center">
              {/* Left: Value Prop & Authority Statement */}
              <div className="flex flex-col lg:col-span-7">
                <Reveal delay={150}>
                  <div className="space-y-space-xs">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                      Principal Financial Architect &amp; Senior Corporate Controller
                    </span>
                    <h1 className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                      Rayyan Vance, <span className="text-primary font-display-lg text-display-lg">CPA, CGMA</span>
                    </h1>
                  </div>
                </Reveal>

                <Reveal delay={250}>
                  <h2 className="mt-space-md font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
                    Institutional-Grade Bookkeeping, GAAP Forensic Integrity &amp; Fractional CFO Stewardship for Scaling Enterprises.
                  </h2>
                </Reveal>

                <Reveal delay={350}>
                  <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Bridging transaction-level reconciliation and board-level strategic finance. Over 14 years modernizing messy charts of accounts, converting delinquent backlogs into audit-proof financial statements, and accelerating monthly closes from 15 days to under 4 days.
                  </p>
                </Reveal>

                {/* Executive CTAs */}
                <Reveal delay={450}>
                  <div className="mt-space-lg flex flex-wrap items-center gap-space-md">
                    <a
                      className="inline-flex items-center gap-space-xs rounded-lg bg-primary-container px-space-lg py-space-sm font-headline-sm text-label-md tracking-tight text-on-primary-container shadow-xl transition-all duration-200 hover:bg-primary hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:-translate-y-0.5"
                      href="#contact"
                    >
                      <span className="material-symbols-outlined text-title-md">verified_user</span>
                      Retain Advisory / Book Discovery
                    </a>
                    <a
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container-high px-space-lg py-space-sm font-headline-sm text-label-md tracking-tight text-secondary shadow-md transition-all duration-200 hover:bg-surface-variant hover:text-on-surface hover:-translate-y-0.5"
                      href="#certifications"
                    >
                      <span className="material-symbols-outlined text-title-md">military_tech</span>
                      Explore Verified Credentials
                    </a>
                    <button
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container-low px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-all hover:bg-surface-container hover:text-on-surface hover:-translate-y-0.5 border border-outline-variant/40"
                      onClick={handleDownloadCV}
                    >
                      <span className="material-symbols-outlined text-title-md">download</span>
                      Executive CV (PDF)
                    </button>
                  </div>
                </Reveal>

                {/* Trust Badges Bar with Animated Counters */}
                <Reveal delay={550}>
                  <div className="mt-space-xl grid grid-cols-2 gap-space-md sm:grid-cols-4">
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-primary">
                        <CountUp end={14} suffix="+ Yrs" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Corporate Practice</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-on-surface">
                        <CountUp end={1.2} decimals={1} prefix="$" suffix="B+" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Flow Supervised</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-secondary">
                        <CountUp end={0} suffix=" Audit" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">PCAOB / AICPA Flags</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-tertiary">
                        <CountUp end={3.8} decimals={1} suffix=" Days" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Median Close Cycle</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right: Executive Portrait & Live Financial Pulse */}
              <div className="relative lg:col-span-5">
                <Reveal delay={300} direction="scale">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    {/* Portrait Frame */}
                    <div className="relative overflow-hidden rounded-2xl bg-surface-container-low shadow-2xl border border-surface-container-high/80 group">
                      <img
                        alt="Rayyan Vance, CPA, CGMA"
                        className="h-[480px] w-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                        src="https://lh3.googleusercontent.com/aida/AEtjO1UGZxywHo-iu_1tE1y98IjAYZpY39-LTa6q_08IJKJFXGp__dXcQf5chVyGWwvh4xnPtX_7uiY9tPbko82mBbTGlClyVGKrm7JXvlLWOkfPTzWVNIvS3NXfS0yHFHtUpL6roQmI34iAqEZ3UySDeAmI-uKwcGb_aQzAEp7gNkjJqHW25dabnD1PHj5LPRhnAf2DrKRNmasWoDsRu36_Fo5Ots7GbdKA9rb28bv0V0SvwSbHBfl6YFvLKc8"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-90"></div>

                      {/* Overlaid Nameplate */}
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-surface-dim/95 p-space-md backdrop-blur-md border border-surface-container-high/60">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Rayyan Vance</h3>
                            <p className="font-label-sm text-label-sm text-secondary">CPA • CGMA • Forensic Controller</p>
                          </div>
                          <div className="flex items-center gap-space-xs rounded-full bg-primary/15 border border-primary/30 px-space-sm py-1">
                            <span className="material-symbols-outlined text-title-md text-primary">check_circle</span>
                            <span className="font-label-sm text-label-sm font-semibold text-primary">AICPA Fellow</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Live Telemetry Glass Card */}
                    <div className="mt-space-md rounded-2xl bg-surface-container-high/95 p-space-md shadow-2xl backdrop-blur-xl sm:-mt-12 sm:ml-6 sm:w-11/12 border border-surface-container-highest/80 animate-float">
                      <div className="mb-space-xs flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-title-md text-primary">analytics</span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">Fiduciary Operational Health</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
                          LIVE LEDGER SYNC
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                        <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container/60 card-hover-effect">
                          <span className="font-label-sm text-label-sm text-outline">Working Capital Ratio</span>
                          <p className="font-headline-sm text-headline-sm font-bold text-on-surface">4.82x</p>
                          <span className="font-label-sm text-label-sm text-primary">+0.4x vs Baseline</span>
                        </div>
                        <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container/60 card-hover-effect">
                          <span className="font-label-sm text-label-sm text-outline">GAAP Reconciliation</span>
                          <p className="font-headline-sm text-headline-sm font-bold text-primary">100.0%</p>
                          <span className="font-label-sm text-label-sm text-primary">Zero Variance Unaudited</span>
                        </div>
                        <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container/60 card-hover-effect">
                          <span className="font-label-sm text-label-sm text-outline">Close Cycle Duration</span>
                          <p className="font-headline-sm text-headline-sm font-bold text-secondary">4.2 Days</p>
                          <span className="font-label-sm text-label-sm text-secondary">Target: &lt;5 Days</span>
                        </div>
                        <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container/60 card-hover-effect">
                          <span className="font-label-sm text-label-sm text-outline">Cash Runway Buffer</span>
                          <p className="font-headline-sm text-headline-sm font-bold text-tertiary">22.4 Mos</p>
                          <span className="font-label-sm text-label-sm text-tertiary">Model: 13-Wk Dynamic</span>
                        </div>
                      </div>

                      {/* Sparkline indicator SVG with interactive hover */}
                      <div className="mt-space-sm flex items-center justify-between rounded-lg bg-surface-container-lowest px-space-sm py-1.5 border border-surface-container/40">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Rolling Variance Monitor</span>
                        <svg className="h-5 w-32 text-primary overflow-visible" fill="none" viewBox="0 0 120 20">
                          <path
                            d="M0 16 L20 14 L40 17 L60 8 L80 10 L100 4 L120 2"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="transition-all duration-300 hover:stroke-[3px]"
                          />
                          <circle cx="120" cy="2" r="3" fill="#4edea3" className="animate-ping" />
                          <circle cx="120" cy="2" r="2.5" fill="#4edea3" />
                        </svg>
                        <span className="font-label-sm text-label-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          CLEAN
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT & PHILOSOPHY */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="about">
          <div className="mx-auto max-w-[1600px] px-margin">
            <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
              {/* Left: Narrative Statement */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <Reveal direction="left">
                  <div className="space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-title-md text-secondary">balance</span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                        Fiduciary Ethos
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      Precision Accounting Built on Fiduciary Truth.
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      My methodology was forged in Big 4 audit rooms at Deloitte &amp; Touche, scrutinizing complex multi-currency revenue recognitions, debt covenants, and balance sheet integrity for high-stakes capital structures.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      When fast-growing corporations scale from $5M to $80M ARR, financial infrastructure routinely fractures. Disconnected payment processors, messy cap tables, and inaccurate accruals create dangerous blind spots. As Corporate Controller and Fractional CFO, I build the immutable ledger foundation required to withstand institutional scrutiny, venture diligence, and regulatory inquiries.
                    </p>
                  </div>
                </Reveal>

                {/* Highlight Quotation Card */}
                <Reveal delay={200} direction="up">
                  <div className="mt-space-lg rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-container-high/60 card-hover-effect">
                    <span className="material-symbols-outlined text-headline-md text-primary">format_quote</span>
                    <blockquote className="font-headline-sm text-headline-sm italic text-on-surface mt-2 leading-relaxed">
                      “Accounting isn't merely historical compliance—it is the operational truth that protects your equity, secures your borrowing covenants, and scales your firm's valuation.”
                    </blockquote>
                    <div className="mt-space-md flex items-center gap-space-sm">
                      <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-headline-sm text-primary font-bold">
                        RV
                      </div>
                      <div>
                        <p className="font-title-md text-title-md font-semibold text-on-surface">Rayyan Vance, CPA, CGMA</p>
                        <p className="font-label-sm text-label-sm text-outline">Founder, Vance Advisory Group PLLC</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right: 3 Core Pillars (Cards) */}
              <div className="flex flex-col gap-space-md lg:col-span-7">
                {/* Pillar 1 */}
                <Reveal delay={150} direction="right">
                  <div className="group card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/50 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-space-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                        <span className="material-symbols-outlined text-headline-md">account_balance_wallet</span>
                      </div>
                      <div className="space-y-space-xs flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                            Accrual Bookkeeping &amp; Clean General Ledgers
                          </h3>
                          <span className="font-label-sm text-label-sm text-primary font-semibold">ASC 606 &amp; 842</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Rigorous transaction classification adhering to strict GAAP principles. Multi-currency journal adjustments, capitalized software development asset schedules, deferred revenue waterfall tracking, and automated zero-variance bank integrations that balance every morning.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            General Ledger Hygiene
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Accruals &amp; Prepaids
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Balance Sheet Schedules
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Pillar 2 */}
                <Reveal delay={300} direction="right">
                  <div className="group card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/50 hover:border-secondary/40 transition-all duration-300">
                    <div className="flex items-start gap-space-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300">
                        <span className="material-symbols-outlined text-headline-md">troubleshoot</span>
                      </div>
                      <div className="space-y-space-xs flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                            Forensic Backlog Remediation
                          </h3>
                          <span className="font-label-sm text-label-sm text-secondary font-semibold">Emergency Cleanups</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Untangling multi-year ledger chaos, distressed recordkeeping, and scrambled merchant gateway payouts (Stripe, PayPal, Shopify, Authorize.net). We eliminate mystery reconciliation balances, resolve disputed Intercompany transfers, and build immutable paper trails.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Historical Catch-Up
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Payment Gateway Reconciliation
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Audit Preparation
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Pillar 3 */}
                <Reveal delay={450} direction="right">
                  <div className="group card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/50 hover:border-tertiary/40 transition-all duration-300">
                    <div className="flex items-start gap-space-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors duration-300">
                        <span className="material-symbols-outlined text-headline-md">monitoring</span>
                      </div>
                      <div className="space-y-space-xs flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-tertiary transition-colors">
                            Board-Ready Reporting &amp; Fractional CFO
                          </h3>
                          <span className="font-label-sm text-label-sm text-tertiary font-semibold">Strategic Stewardship</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Executive management reporting packages, rolling 13-week cash flow scenarios, unit economic modeling (CAC, LTV, Magic Number), and strategic entity structuring. Designed to provide founders and boards the clarity needed to deploy capital without anxiety.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            13-Week Cash Modeling
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Board Governance Packages
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Capital Optimization
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: LICENSES & VERIFIED CREDENTIALS */}
        <section className="w-full py-space-xl" id="certifications">
          <div className="mx-auto max-w-[1600px] px-margin">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                <div>
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                    Statutory Authority
                  </span>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                    Licenses &amp; Professional Accreditations
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                    Active, verified fiduciary qualifications backed by regulatory oversight boards and rigorous continuous professional education.
                  </p>
                </div>

                {/* Filter Pill Tabs */}
                <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high">
                  <button
                    className={`rounded-lg px-space-md py-1 font-label-sm text-label-sm transition-all duration-200 ${
                      selectedCategory === "all"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All (9)
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1 font-label-sm text-label-sm transition-all duration-200 ${
                      selectedCategory === "cpa"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setSelectedCategory("cpa")}
                  >
                    State CPA
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1 font-label-sm text-label-sm transition-all duration-200 ${
                      selectedCategory === "global"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setSelectedCategory("global")}
                  >
                    Designations
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1 font-label-sm text-label-sm transition-all duration-200 ${
                      selectedCategory === "software"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                    onClick={() => setSelectedCategory("software")}
                  >
                    ERP &amp; Stack
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Credential Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {filteredCredentials.map((cred, idx) => (
                <Reveal key={cred.id} delay={idx * 75}>
                  <div
                    className="card-hover-effect rounded-2xl bg-surface-container p-space-md shadow-lg border border-surface-container-high/60 transition-all duration-300 hover:border-primary/40 hover:bg-surface-container-high flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className={`material-symbols-outlined text-headline-md ${cred.iconColor}`}>
                          {cred.icon}
                        </span>
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-medium">
                          {cred.badge}
                        </span>
                      </div>
                      <h3 className="mt-space-sm font-headline-sm text-headline-sm font-bold text-on-surface">
                        {cred.title}
                      </h3>
                      <p className="font-label-sm text-label-sm text-secondary mt-1">{cred.issuer}</p>
                    </div>
                    <div className="mt-space-md flex items-center justify-between rounded-lg bg-surface-container-lowest p-space-xs border border-surface-container-high/40">
                      <span className="font-label-sm text-label-sm text-outline">{cred.idNumber}</span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">{cred.extraInfo}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Continuing Education (CPE) Tracker Bar */}
            <Reveal delay={300}>
              <div className="mt-space-xl rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-container-high/80 card-hover-effect">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-title-md text-primary">school</span>
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Triennial CPE Continuous Education Ledger
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                      California &amp; NY Boards require 120 verified CPE hours per triennium. Current record stands at 123% compliance.
                    </p>
                  </div>
                  <div className="flex items-center gap-space-md">
                    <div className="text-right">
                      <span className="font-headline-md text-headline-md font-bold text-primary">
                        <CountUp end={148.0} decimals={1} suffix=" Hours" />
                      </span>
                      <p className="font-label-sm text-label-sm text-outline">120 Hour Triennial Requirement</p>
                    </div>
                    <span className="rounded-full bg-primary/20 border border-primary/30 px-space-sm py-1 font-label-md text-label-md font-bold text-primary animate-pulse">
                      123% Complete
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar with gradient animation */}
                <div className="mt-space-md h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(78,222,163,0.5)]"
                    style={{ width: "100%" }}
                  ></div>
                </div>

                <div className="mt-space-md grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  <div className="rounded-lg bg-surface-container p-space-xs border border-surface-container-high/50 card-hover-effect">
                    <span className="font-label-sm text-label-sm text-secondary font-medium">Regulatory &amp; Board Ethics</span>
                    <p className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">16.0 Hrs (100%)</p>
                  </div>
                  <div className="rounded-lg bg-surface-container p-space-xs border border-surface-container-high/50 card-hover-effect">
                    <span className="font-label-sm text-label-sm text-primary font-medium">Technical Accounting &amp; GAAP</span>
                    <p className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">92.5 Hrs (142%)</p>
                  </div>
                  <div className="rounded-lg bg-surface-container p-space-xs border border-surface-container-high/50 card-hover-effect">
                    <span className="font-label-sm text-label-sm text-tertiary font-medium">Financial Cybersecurity &amp; AI</span>
                    <p className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">39.5 Hrs (110%)</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 4: WORK EXPERIENCE & CAREER TRAJECTORY */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="experience">
          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Section Header */}
            <Reveal>
              <div className="mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                  Proven Trajectory
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                  Executive Career &amp; Operational Leadership
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Fourteen years navigating hyper-growth scaleups, public corporate controllership, and Big 4 audit scrutiny.
                </p>
              </div>
            </Reveal>

            {/* Experience Timeline */}
            <div className="relative space-y-space-lg">
              {/* Role 1 */}
              <Reveal delay={150}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-primary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Managing Partner &amp; Fractional CFO
                        </span>
                        <span className="rounded bg-primary/20 border border-primary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-primary">
                          Current Mandate
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">Vance Advisory Group PLLC</p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      2022 – Present • New York &amp; San Francisco
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Directing financial operations, treasury governance, and full-cycle controllership for 8 concurrent high-growth SaaS, FinTech, and D2C enterprises generating between $10M and $65M ARR.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Compressed client average month-end close by 71% (from 14.5 days down to 4.2 days) utilizing custom automated NetSuite/QBO API pipeline reconciliation logic.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Structured debt financing and revolving credit facilities totaling $85M across 4 portfolio clients, negotiating strict covenant covenants to protect shareholder equity.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Supervised cross-border legal consolidation across Delaware C-Corps, UK Subsidiaries, and Canadian R&amp;D entities with complex ASC 830 foreign currency translation.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Quantified Impact</span>
                      <div className="space-y-space-xs my-space-xs">
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-primary">
                            <CountUp end={71} suffix="%" />
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Close Cycle Reduction</span>
                        </div>
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-secondary">
                            <CountUp end={85} prefix="$" suffix="M+" />
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Non-Dilutive Capital Secured</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">Verified Fiduciary Record</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 2 */}
              <Reveal delay={250}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-secondary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Corporate Controller &amp; VP of Finance
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">FinPulse Technologies Inc. (B2B Enterprise SaaS)</p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      2018 – 2022 • San Francisco, CA
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Built and led a 14-person global corporate accounting and finance team spanning US, UK, and EMEA subsidiaries for a SaaS enterprise scaling from $18M to $75M ARR.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Led four consecutive unmodified Ernst &amp; Young audits with zero material weaknesses, zero deficiencies, and zero post-closing journal restatements.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Migrated legacy disparate QuickBooks &amp; billings into Oracle NetSuite ERP with full ASC 606 automated rev-rec engine in under 90 days.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Presided over banking syndication diligence during $110M Series C round led by top-tier growth funds.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Key Metric</span>
                      <div className="space-y-space-xs my-space-xs">
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-primary">4 / 4</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Clean EY Audits</span>
                        </div>
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-tertiary">
                            <CountUp end={350} suffix="+" />
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Global Headcount Financed</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">Zero SOX Deficiencies</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 3 */}
              <Reveal delay={350}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-tertiary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Senior Audit Manager &amp; Forensic Lead
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">Deloitte &amp; Touche LLP</p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      2014 – 2018 • New York, NY
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Directed integrated audits and forensic fraud investigations for mid-market and multinational corporate clients ($50M to $400M revenue) under PCAOB and AICPA auditing standards.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Formulated SOX 404 internal control testing programs and identified $12M in fraudulent payroll padding at an industrial manufacturing client.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Authored technical accounting memoranda on complex debt-equity instruments, bifurcated warrants, and business combinations.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Big 4 Experience</span>
                      <div className="space-y-space-xs my-space-xs">
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-secondary">
                            <CountUp end={32} suffix="+" />
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Lead Engagement Audits</span>
                        </div>
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-primary">100%</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant"> Technical Review Pass Rate</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">Forensic Specialization</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 4 */}
              <Reveal delay={450}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Senior Staff Accountant &amp; Bookkeeping Specialist
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">Apex Wealth &amp; Corporate Services</p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      2010 – 2014 • Los Angeles, CA
                    </div>
                  </div>
                  <div className="mt-space-md space-y-space-xs">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Reconstructed distressed client books with up to 18-month transaction backlogs. Built customized GL architectures in QuickBooks Enterprise, standardized month-end accrual checklists, and instituted sales tax nexus filings across 24 states.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 5: TOOLS, ERP & FINANCIAL TECH STACK */}
        <section className="w-full py-space-xl" id="tools">
          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Header */}
            <Reveal>
              <div className="mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                  Infrastructure &amp; Tooling
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                  Enterprise Financial Tooling &amp; Automated Ecosystem
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  We do not rely on manual spreadsheets alone. We architect high-integrity, automated data pipelines that eliminate human entry error and reconcile millions in transactions seamlessly.
                </p>
              </div>
            </Reveal>

            {/* Segmented Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Matrix 1: Core GL */}
              <Reveal delay={100}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">account_balance</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Core GL Systems</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Primary ledger engines for GAAP-compliant balance sheet and P&amp;L consolidation.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Oracle NetSuite</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Master ERP</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">QuickBooks Online Adv.</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">ProAdvisor</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Xero Platinum</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Partner</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Sage Intacct</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Certified</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Multi-Entity Consolidation Ready</span>
                </div>
              </Reveal>

              {/* Matrix 2: FP&A */}
              <Reveal delay={200}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-secondary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">trending_up</span>
                      <span className="font-label-md text-label-md font-bold uppercase">FP&amp;A &amp; Modeling</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Rolling 13-week liquidity, scenario budgeting, and venture board models.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Jirav</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">Expert</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Cube Software</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">Integrated</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Float / Cash Flow</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">Daily Sync</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Pigment / Anaplan</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Scaleups</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">13-Week Cash Burn Specialists</span>
                </div>
              </Reveal>

              {/* Matrix 3: Billing & Ops */}
              <Reveal delay={300}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-tertiary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">payments</span>
                      <span className="font-label-md text-label-md font-bold uppercase">AP/AR &amp; Operations</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Frictionless payable approvals, automated tax nexus, and payroll engines.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Bill.com &amp; Ramp</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">AP Automated</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Brex Treasury</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">Integrated</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Gusto &amp; Rippling</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">GL Payroll</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Avalara AvaTax</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">50 States</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Zero Phantom AP Leaks</span>
                </div>
              </Reveal>

              {/* Matrix 4: Forensic Data Pipeline */}
              <Reveal delay={400}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">database</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Forensic Pipelines</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Direct SQL ledger query scripts, automated ETL, and data verification scripts.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">BigQuery / SQL</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Ledger Query</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Alteryx</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Forensic ETL</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Excel VBA / PowerQuery</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Master Models</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Stripe API Webhooks</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Custom Clear</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">100k+ Row Reconciliations</span>
                </div>
              </Reveal>
            </div>

            {/* Architecture Flow Diagram Card */}
            <Reveal delay={200}>
              <div className="mt-space-lg rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-container-high/80 card-hover-effect">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-headline-sm text-primary">hub</span>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      API Integration &amp; Real-Time Ledger Sync Architecture
                    </h3>
                  </div>
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-space-sm py-1 font-label-sm text-label-sm text-primary font-semibold animate-pulse">
                    AUTOMATED AUDIT TRAIL
                  </span>
                </div>

                {/* Architectural Visual Representation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm text-center">
                  <div className="card-hover-effect rounded-xl bg-surface-container p-space-md border border-surface-container-high/50 hover:border-secondary/40 transition-all">
                    <div className="font-label-sm text-label-sm text-secondary uppercase font-bold">1. Ingestion Layer</div>
                    <p className="font-title-md text-title-md font-bold text-on-surface mt-1">Payment Gateways &amp; Banks</p>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      Stripe, SVB, Brex, Chase, Shopify API webhooks streaming hourly raw payloads.
                    </p>
                  </div>
                  <div className="card-hover-effect rounded-xl bg-surface-container p-space-md border border-surface-container-high/50 hover:border-primary/40 transition-all">
                    <div className="font-label-sm text-label-sm text-primary uppercase font-bold">2. Clearing Transformation</div>
                    <p className="font-title-md text-title-md font-bold text-on-surface mt-1">Custom Settlement Scripts</p>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      Splits processing fees, refunds, chargebacks &amp; transit holds into isolated clearing accounts.
                    </p>
                  </div>
                  <div className="card-hover-effect rounded-xl bg-surface-container p-space-md border border-surface-container-high/50 hover:border-tertiary/40 transition-all">
                    <div className="font-label-sm text-label-sm text-tertiary uppercase font-bold">3. GAAP Core Ledger</div>
                    <p className="font-title-md text-title-md font-bold text-on-surface mt-1">NetSuite / QBO GL</p>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      ASC 606 waterfall recognized; automated balance-sheet roll-forwards verified daily.
                    </p>
                  </div>
                  <div className="card-hover-effect rounded-xl bg-surface-container p-space-md border border-surface-container-high/50 hover:border-secondary/40 transition-all">
                    <div className="font-label-sm text-label-sm text-secondary uppercase font-bold">4. Board Output</div>
                    <p className="font-title-md text-title-md font-bold text-on-surface mt-1">Executive Dashboard</p>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      Live 13-week liquidity, EBITDA bridge, and debt-service coverage ratio telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 6: WORK SAMPLES & ADVISORY CASE STUDIES */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="samples">
          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Section Title */}
            <Reveal>
              <div className="mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                  Measurable Outcomes
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                  Proven Turnarounds &amp; High-Impact Case Deliverables
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Real enterprise engagements showcasing forensic precision, backlog liquidation, and balance sheet protection under high-stakes audit conditions.
                </p>
              </div>
            </Reveal>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              {/* Case 1 */}
              <Reveal delay={100}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-xl flex flex-col justify-between border border-surface-container-high/70 hover:border-primary/40 transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="rounded bg-primary/20 border border-primary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-primary">
                        VENTURE DUE DILIGENCE
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-medium">FinTech • Series B</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                      18-Month Ledger Backlog Remediation for Series B FinTech
                    </h3>
                    <div className="mt-space-md space-y-space-sm">
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-error">The Problem:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          14,000+ un-reconciled Stripe transactions, co-mingled merchant payouts, and a $3.1M suspense balance halting a $42M venture round with 4 weeks to deadline.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-secondary">The Intervention:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Wrote programmatic clearing scripts to parse raw Stripe webhook logs into NetSuite, mapped deferred revenue waterfalls, and reconstructed 18 balance sheets.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-primary">The Result:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Unqualified due-diligence sign-off from tier-1 institutional VC; $42M Series B closed on time with zero valuation haircut.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold">Cleared 100% Variance</span>
                    <span className="font-label-sm text-label-sm text-outline">6-Week Execution</span>
                  </div>
                </div>
              </Reveal>

              {/* Case 2 */}
              <Reveal delay={250}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-xl flex flex-col justify-between border border-surface-container-high/70 hover:border-secondary/40 transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="rounded bg-secondary/20 border border-secondary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-secondary">
                        OPERATIONAL RECOVERY
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-medium">Omnichannel Retail</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                      Multi-Entity E-Commerce Accounting &amp; COGS Modernization
                    </h3>
                    <div className="mt-space-md space-y-space-sm">
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-error">The Problem:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Disconnected Amazon FBA, Shopify Plus, and wholesale EDI channels causing phantom inventory bleed, erroneous gross margins, and missed state sales tax filings.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-secondary">The Intervention:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Re-engineered perpetual landed-cost inventory accounting, deployed Avalara automated nexus calculation, and consolidated 3 warehouse ledgers into QBO Advanced.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-primary">The Result:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Uncovered $840k/yr in vendor double-billing and inventory shrinkage; elevated gross profit visibility by +7.4 percentage points.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary font-bold">+$840,000 Recovered</span>
                    <span className="font-label-sm text-label-sm text-outline">3 Warehouse Sites</span>
                  </div>
                </div>
              </Reveal>

              {/* Case 3 */}
              <Reveal delay={400}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-xl flex flex-col justify-between border border-surface-container-high/70 hover:border-tertiary/40 transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="rounded bg-tertiary/20 border border-tertiary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-tertiary">
                        AUDIT DEFENSE &amp; TAX
                      </span>
                      <span className="font-label-sm text-label-sm text-outline font-medium">Enterprise SaaS</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                      IRS Audit Defense &amp; $1.8M R&amp;D Tax Credit Recovery
                    </h3>
                    <div className="mt-space-md space-y-space-sm">
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-error">The Problem:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Notice of deficiency and $380,000 in proposed penalties from state and federal auditors following inaccurate payroll allocations by an uncertified bookkeeper.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-secondary">The Intervention:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Invoked Enrolled Agent representation privileges, produced contemporaneous time-tracking audit trails, and conducted forensic engineering wage classification under IRC Sec 41.
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-label-sm text-label-sm font-bold text-primary">The Result:</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          100% penalty abatement secured, IRS audit closed with no change, and recaptured $1,824,500 in liquid federal R&amp;D payroll tax offset credits.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">$1.82M Recaptured</span>
                    <span className="font-label-sm text-label-sm text-outline">Full Abatement</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Downloadable Work Sample Deliverables */}
            <Reveal delay={200}>
              <div className="mt-space-xl rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-container-high/80 card-hover-effect">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="space-y-space-xs">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Inspect Sanitized Sample Deliverables
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                      Download sanitized, anonymized financial artifacts demonstrating our reporting rigor, executive dashboard formatting, and forensic reconciliation proof-of-work.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <button
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-space-sm font-label-md text-label-md text-on-surface transition-all hover:bg-surface-container-high hover:-translate-y-0.5 border border-surface-container-high"
                      onClick={() => handleInspectArtifact("cash-forecast")}
                    >
                      <span className="material-symbols-outlined text-title-md text-primary">table_chart</span>
                      13-Week Cash Forecast Model (.xlsx)
                    </button>
                    <button
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-space-sm font-label-md text-label-md text-on-surface transition-all hover:bg-surface-container-high hover:-translate-y-0.5 border border-surface-container-high"
                      onClick={() => handleInspectArtifact("board-package")}
                    >
                      <span className="material-symbols-outlined text-title-md text-secondary">picture_as_pdf</span>
                      Board Reporting Package (.pdf)
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 7: WORK WITH ME / ADVISORY ENGAGEMENT & INTAKE */}
        <section className="relative w-full py-space-xl" id="contact">
          <div className="mx-auto max-w-[1600px] px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              {/* Left: Engagement Protocol & Terms */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <Reveal direction="left">
                  <div className="space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-title-md text-primary">handshake</span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                        Advisory Retainer
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      Retain Audit-Grade Bookkeeping &amp; Fractional CFO Leadership
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      We maintain a strictly capped roster of clients to preserve uncompromised fiduciary focus. Currently accepting{" "}
                      <strong className="text-secondary">2 new enterprise or high-growth scaleup advisory mandates</strong> for Q3/Q4.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Every prospective engagement begins with a mutual Non-Disclosure Agreement (NDA), followed by a comprehensive forensic discovery audit of your existing chart of accounts, bank feeds, and statutory tax filings.
                    </p>

                    {/* Direct Contact List */}
                    <div className="mt-space-lg space-y-space-sm rounded-xl bg-surface-container p-space-md border border-surface-container-high/60 card-hover-effect">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-headline-sm text-primary">mail</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Encrypted Direct Inquiry</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">rayyan.vance@vance-advisory.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-headline-sm text-secondary">phone_in_talk</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Executive Office Direct</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">+1 (212) 847-9201</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-headline-sm text-tertiary">location_on</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Practice Chambers</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">
                            One Financial Plaza, Suite 3400, New York, NY
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Peer Review & Regulatory Note */}
                <Reveal delay={200} direction="up">
                  <div className="mt-space-lg rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/50 card-hover-effect">
                    <span className="font-label-sm text-label-sm font-bold text-secondary">AICPA PEER REVIEW NOTICE</span>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      Rayyan Vance, CPA adheres strictly to AICPA Code of Professional Conduct, California Board of Accountancy standards, and statutory forensic guidelines. All financial statements prepared under SSARS guidance.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right: Mandate Intake Form */}
              <div className="lg:col-span-7">
                <Reveal delay={200} direction="scale">
                  <div className="rounded-2xl bg-surface-container p-space-xl shadow-2xl border border-surface-container-high/80">
                    <div className="flex items-center justify-between mb-space-md">
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Confidential Mandate Application
                      </h3>
                      <span className="rounded bg-primary/10 border border-primary/30 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        256-Bit Encrypted
                      </span>
                    </div>

                    {formSubmitted ? (
                      <div className="rounded-xl bg-primary/10 border border-primary/30 p-space-lg text-center space-y-space-sm animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-2 animate-bounce">
                          <span className="material-symbols-outlined text-display-lg text-primary">verified</span>
                        </div>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary block">
                          Mandate Inquiry Transmitted Privileged &amp; Encrypted
                        </span>
                        <p className="font-body-md text-body-md text-on-surface max-w-lg mx-auto">
                          Thank you, <strong className="text-secondary">{formData.fullName || "Partner"}</strong>. Your context for{" "}
                          <strong className="text-primary">{formData.companyName || "your enterprise"}</strong> has been logged into Vance Advisory&apos;s secured queue. Rayyan Vance will review your operational context and reach out within 12 business hours.
                        </p>
                        <button
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              fullName: "",
                              companyName: "",
                              email: "",
                              phone: "",
                              revenueBand: "",
                              ledgerStack: "",
                              scope: "",
                              context: "",
                              ndaAgreed: false,
                            });
                          }}
                          className="mt-4 inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-space-md" onSubmit={handleFormSubmit}>
                        {/* Name & Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Full Name *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="e.g. Eleanor Vance"
                              required
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Enterprise / Company Name *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="e.g. Apex Dynamics Corp."
                              required
                              type="text"
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Corporate Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Corporate Email *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="name@company.com"
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Direct Phone Number *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="+1 (555) 000-0000"
                              required
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Annual Revenue Tier */}
                        <div className="space-y-space-xs">
                          <label className="font-label-sm text-label-sm text-on-surface font-medium">Annual Revenue Band *</label>
                          <select
                            className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                            required
                            value={formData.revenueBand}
                            onChange={(e) => setFormData({ ...formData, revenueBand: e.target.value })}
                          >
                            <option disabled value="">Select Current Scale</option>
                            <option value="1-5m">$1,000,000 – $5,000,000 ARR</option>
                            <option value="5-20m">$5,000,000 – $20,000,000 ARR</option>
                            <option value="20-50m">$20,000,000 – $50,000,000 ARR</option>
                            <option value="50m+">$50,000,000+ Enterprise ARR</option>
                          </select>
                        </div>

                        {/* Current Accounting Tooling & Mandate Scope */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Current General Ledger Stack *</label>
                            <select
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              required
                              value={formData.ledgerStack}
                              onChange={(e) => setFormData({ ...formData, ledgerStack: e.target.value })}
                            >
                              <option disabled value="">Select Core Platform</option>
                              <option value="netsuite">Oracle NetSuite</option>
                              <option value="qbo">QuickBooks Online Advanced</option>
                              <option value="xero">Xero</option>
                              <option value="sage">Sage Intacct</option>
                              <option value="other">Distressed / Multiple Disparate</option>
                            </select>
                          </div>
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Primary Engagement Scope *</label>
                            <select
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              required
                              value={formData.scope}
                              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                            >
                              <option disabled value="">Select Primary Need</option>
                              <option value="fractional-cfo">Fractional CFO &amp; Strategic Finance</option>
                              <option value="controllership">Ongoing Controllership &amp; Full Bookkeeping</option>
                              <option value="backlog-cleanup">Emergency Ledger Backlog &amp; Diligence Cleanup</option>
                              <option value="audit-defense">Audit Prep / Forensic Reconstruction</option>
                            </select>
                          </div>
                        </div>

                        {/* Brief Operational Context */}
                        <div className="space-y-space-xs">
                          <label className="font-label-sm text-label-sm text-on-surface font-medium">
                            Brief Operational Context / Immediate Priorities
                          </label>
                          <textarea
                            className="w-full rounded-lg bg-surface-container-low p-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                            placeholder="Outline your current bottlenecks, transaction volume, audit timeline, or backlog conditions..."
                            rows={3}
                            value={formData.context}
                            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                          ></textarea>
                        </div>

                        {/* Fiduciary Accord Check */}
                        <div className="flex items-start gap-space-xs pt-space-xs">
                          <input
                            className="mt-1 h-4 w-4 rounded bg-surface-container-low text-primary focus:ring-primary accent-primary cursor-pointer"
                            id="nda-accord"
                            required
                            type="checkbox"
                            checked={formData.ndaAgreed}
                            onChange={(e) => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                          />
                          <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="nda-accord">
                            I understand that initial discovery is strictly confidential and Vance Advisory executes bilateral NDAs prior to accessing proprietary financial ledgers.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          className="w-full rounded-lg bg-primary-container py-space-sm font-headline-sm text-label-md tracking-tight text-on-primary-container shadow-xl transition-all duration-200 hover:bg-primary hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] cursor-pointer font-bold hover:-translate-y-0.5"
                          type="submit"
                        >
                          Submit Confidential Mandate Inquiry
                        </button>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest text-on-surface-variant py-space-xl border-t border-surface-container-high">
        <div className="max-w-[1600px] mx-auto px-margin flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold">
                Rayyan Vance, CPA
              </span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-secondary border border-secondary/20">
                License #CPA-782410
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline max-w-xl">
              Strict fiduciary advisory, forensic reconciliations, and sovereign enterprise bookkeeping. Prepared in adherence to AICPA and statutory audit standards.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-space-xs">
            <div className="flex items-center gap-space-md flex-wrap">
              <button
                onClick={() => setActiveModal("regulatory")}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Regulatory Disclosures
              </button>
              <span className="text-outline-variant">•</span>
              <button
                onClick={() => setActiveModal("privacy")}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Privacy Accord
              </button>
              <span className="text-outline-variant">•</span>
              <button
                onClick={() => setActiveModal("terms")}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Terms of Engagement
              </button>
            </div>
            <p className="font-label-sm text-label-sm text-outline">
              &copy; {new Date().getFullYear()} Vance Advisory PLLC. All Fiduciary Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK-ACTION & BACK TO TOP BUTTON */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary/90 text-on-primary font-bold text-xs shadow-[0_4px_20px_rgba(78,222,163,0.35)] backdrop-blur-md hover:bg-primary hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Discovery Call
          </a>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-surface-container-high/90 text-on-surface border border-surface-container-highest shadow-xl backdrop-blur-md hover:bg-surface-bright hover:text-primary hover:scale-110 transition-all cursor-pointer group"
            aria-label="Back to top"
          >
            <span className="material-symbols-outlined text-title-md group-hover:-translate-y-0.5 transition-transform">
              arrow_upward
            </span>
          </button>
        </div>
      )}

      {/* MODAL DIALOGS */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-surface-container p-space-lg shadow-2xl border border-surface-container-high max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-title-md">close</span>
            </button>

            {activeModal === "cv" && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm text-primary">
                  <span className="material-symbols-outlined text-headline-md">verified_user</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Executive Fiduciary CV &amp; Dossier
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Rayyan Vance, CPA, CGMA, CMA, EA, CFE — Comprehensive 14-year career dossier including verified statutory licenses, Big 4 audit history, and transaction record.
                </p>
                <div className="rounded-xl bg-surface-container-low p-space-md border border-surface-container-high space-y-2 font-mono text-xs text-outline">
                  <div className="flex justify-between">
                    <span className="text-secondary">SHA-256 HASH:</span>
                    <span className="text-primary truncate ml-2">9f8e4b7c2a1d0e5f8842...31ec87</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATE CPA LICENSES:</span>
                    <span className="text-on-surface">CA #148920 | NY #092819</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-primary font-bold">ACTIVE &amp; IN GOOD STANDING</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert("Executive CV Dossier (PDF with cryptographic signature) has been prepared and downloaded.");
                      setActiveModal(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Download Signed PDF
                  </button>
                </div>
              </div>
            )}

            {activeModal === "cash-forecast" && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm text-primary">
                  <span className="material-symbols-outlined text-headline-md">table_chart</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    13-Week Dynamic Liquidity &amp; Cash Flow Model
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sanitized enterprise model featuring rolling AP/AR disbursements, cash runway burn curves, multi-bank balance feeds, and scenario sensitivity dials.
                </p>
                <div className="rounded-xl bg-surface-container-low p-space-md border border-surface-container-high overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-surface-container-high text-secondary">
                        <th className="py-2 px-2">Metric ($k)</th>
                        <th className="py-2 px-2">Wk 1</th>
                        <th className="py-2 px-2">Wk 2</th>
                        <th className="py-2 px-2">Wk 3</th>
                        <th className="py-2 px-2">Wk 4</th>
                        <th className="py-2 px-2">Wk 13</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface-variant divide-y divide-surface-container-high/40">
                      <tr>
                        <td className="py-2 px-2 font-medium text-on-surface">Starting Cash</td>
                        <td className="py-2 px-2">$4,820</td>
                        <td className="py-2 px-2">$4,690</td>
                        <td className="py-2 px-2">$5,140</td>
                        <td className="py-2 px-2">$4,980</td>
                        <td className="py-2 px-2">$6,250</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-medium text-primary">Collections (ARR)</td>
                        <td className="py-2 px-2 text-primary">+$340</td>
                        <td className="py-2 px-2 text-primary">+$820</td>
                        <td className="py-2 px-2 text-primary">+$290</td>
                        <td className="py-2 px-2 text-primary">+$710</td>
                        <td className="py-2 px-2 text-primary">+$950</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-medium text-error">Operating OPEX</td>
                        <td className="py-2 px-2 text-error">-$470</td>
                        <td className="py-2 px-2 text-error">-$370</td>
                        <td className="py-2 px-2 text-error">-$450</td>
                        <td className="py-2 px-2 text-error">-$390</td>
                        <td className="py-2 px-2 text-error">-$480</td>
                      </tr>
                      <tr className="font-bold text-on-surface bg-surface-container-high/20">
                        <td className="py-2 px-2">Ending Runway</td>
                        <td className="py-2 px-2 text-tertiary">21.8 Mos</td>
                        <td className="py-2 px-2 text-tertiary">22.4 Mos</td>
                        <td className="py-2 px-2 text-tertiary">22.1 Mos</td>
                        <td className="py-2 px-2 text-tertiary">23.0 Mos</td>
                        <td className="py-2 px-2 text-tertiary">24.6 Mos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => {
                      alert("Opening sanitized 13-Week Dynamic Liquidity Model (.xlsx). All proprietary corporate names and tax IDs obfuscated.");
                      setActiveModal(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Download Excel Model
                  </button>
                </div>
              </div>
            )}

            {activeModal === "board-package" && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm text-secondary">
                  <span className="material-symbols-outlined text-headline-md">picture_as_pdf</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Board Governance Financial Package
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  GAAP &amp; ASC 606 certified board presentation deck with EBITDA bridges, cohort retention waterfalls, GAAP to Non-GAAP reconciliations, and debt covenant compliance certificates.
                </p>
                <div className="rounded-xl bg-surface-container-low p-space-md border border-surface-container-high space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface font-medium">Executive Summary &amp; KPI Radar</span>
                    <span className="text-primary font-mono text-xs">Page 1-4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface font-medium">GAAP Financials &amp; Balance Sheet Rollforwards</span>
                    <span className="text-primary font-mono text-xs">Page 5-12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface font-medium">Unit Economics: Magic Number &amp; CAC Payback</span>
                    <span className="text-primary font-mono text-xs">Page 13-18</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => {
                      alert("Opening sanitized Board Governance Financial Package (.pdf).");
                      setActiveModal(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-container transition-colors cursor-pointer"
                  >
                    Download Board PDF
                  </button>
                </div>
              </div>
            )}

            {(activeModal === "regulatory" || activeModal === "privacy" || activeModal === "terms") && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm text-primary">
                  <span className="material-symbols-outlined text-headline-md">gavel</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface capitalize">
                    {activeModal.replace("-", " ")} Accord &amp; Protocol
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Vance Advisory Group PLLC operates in strict conformance with the AICPA Code of Professional Conduct, California Board of Accountancy Regulations, and New York State Education Department Office of the Professions rules.
                </p>
                <div className="rounded-xl bg-surface-container-low p-space-md border border-surface-container-high text-body-sm text-outline space-y-2 leading-relaxed">
                  <p>
                    All client interactions and initial advisory discovery requests are cloaked in strict statutory confidentiality. Proprietary financial ledgers and tax disclosures are safeguarded with SOC2-compliant encryption.
                  </p>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Acknowledged
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
