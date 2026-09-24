"use client";

import React, { useState, useEffect, useRef } from "react";

type DocCategory = "all" | "pds" | "coe" | "wes";
type CredentialCategory = "all" | "accounting" | "finance" | "ops";

interface OfficialDoc {
  id: string;
  category: "pds" | "coe" | "wes";
  categoryLabel: string;
  title: string;
  issuer: string;
  dateOrDuration: string;
  pdfPath: string;
  badge: string;
  icon: string;
  iconColor: string;
  summary: string;
  keyPoints: string[];
}

const officialDocs: OfficialDoc[] = [
  {
    id: "pds",
    category: "pds",
    categoryLabel: "Personal Data Sheet",
    title: "Personal Data Sheet (CS Form No. 212)",
    issuer: "Civil Service Commission / Republic of the Philippines",
    dateOrDuration: "Revised 2025 • Official Record",
    pdfPath: "/personal-data-sheet/PersonalDataSheet BRIONES.pdf",
    badge: "Official CSC Record",
    icon: "badge",
    iconColor: "text-primary",
    summary:
      "Comprehensive statutory record detailing BS in Accountancy degree from Andres Bonifacio College, Civil Service Professional Eligibility (80.24%), 20+ year continuous employment record, and government L&D programs.",
    keyPoints: [
      "Education: Bachelor of Science in Accountancy (2000–2004, Andres Bonifacio College)",
      "Civil Service Eligibility: CSE Professional (Rating: 80.24%, Oct 21, 2012)",
      "2023 Best Customer Service Employee: DBO Level Winner & Division Level Winner (MND)",
      "Continuous L&D: Data Privacy Act of 2012 (R.A. 10173), Risk Management, QMS Deployment, PIMS Procurement",
    ],
  },
  {
    id: "coe-tski",
    category: "coe",
    categoryLabel: "Certificate of Employment",
    title: "Certificate of Employment — Taytay Sa Kauswagan, Inc.",
    issuer: "Taytay Sa Kauswagan, Incorporated (TSKI) • ISO 9001:2008 Certified",
    dateOrDuration: "Jan 23, 2006 – Aug 8, 2012 (6.5+ Years)",
    pdfPath: "/certificate-of-employment/Certificate fo Employment - TSK, Incorporated.pdf",
    badge: "Permanent Status",
    icon: "domain",
    iconColor: "text-secondary",
    summary:
      "Verified microfinance and corporate bookkeeping employment record over 6.5 years managing full-cycle general ledgers, loan disbursements, daily cash collections, and branch balance sheets.",
    keyPoints: [
      "Designation: Bookkeeper (Liloy Branch)",
      "Status: Permanent / Resigned in Good Standing",
      "Corporate Focus: Microfinance loan portfolio accounting, daily cash reconciliation, and branch audit readiness",
      "Issued by: Beverly Joy M. Navigar, HR Manager",
    ],
  },
  {
    id: "coe-paglaum",
    category: "coe",
    categoryLabel: "Certificate of Employment",
    title: "Certificate of Employment — Paglaum Multi-Purpose Cooperative",
    issuer: "Paglaum Multi-Purpose Cooperative / Plaridel Service Cooperative",
    dateOrDuration: "Dec 10, 2012 – Oct 10, 2013",
    pdfPath: "/certificate-of-employment/Certificate of Employment - PAGLAUM MPC.pdf",
    badge: "Cooperative Bookkeeper",
    icon: "account_balance",
    iconColor: "text-tertiary",
    summary:
      "Statutory employment certification as Bookkeeper for Plaridel Service Cooperative (PLASECO), subsidiary of Paglaum MPC (CDA Reg. No. 9520-10005976).",
    keyPoints: [
      "Designation: Bookkeeper (Plaridel Service Cooperative)",
      "Coverage: Cooperative financial ledgers, member savings/shares records, and loan transactions",
      "Issued by: Maria Theresa A. Salabas, HR/Admin Officer",
    ],
  },
  {
    id: "wes-admin",
    category: "wes",
    categoryLabel: "Work Experience Sheet",
    title: "Work Experience Sheet — Junior Administrative Assistant",
    issuer: "Social Security System (SSS), Oroquieta Branch",
    dateOrDuration: "Jan 2023 – Present & Aug 2015 – Dec 2018",
    pdfPath: "/work-experience/Work Experience Sheet - ADMIN.pdf",
    badge: "Public Administration",
    icon: "fact_check",
    iconColor: "text-primary",
    summary:
      "Detailed actual duties covering administrative operations, financial payment vouchers, PIMS procurement, inventory control, HR attendance/leave administration, and UMID card releases.",
    keyPoints: [
      "Financial & Procurement: Prepared vouchers and complete supporting documents for payment processing; initiated supplies/equipment procurement requisitions",
      "Budget Planning: Assisted in administrative budget planning and prioritization",
      "Asset & Inventory: Maintained inventory of office supplies, furniture, and equipment with systematic tracking",
      "Client Service: Facilitated UMID card releases and resolved administrative inquiries",
    ],
  },
  {
    id: "wes-bookkeeper",
    category: "wes",
    categoryLabel: "Work Experience Sheet",
    title: "Work Experience Sheet — Master Bookkeeper",
    issuer: "BASCOFAMCO, TSK, Inc. & Paglaum Multi-Purpose Cooperative",
    dateOrDuration: "June 13, 2004 – October 10, 2013 (9+ Years)",
    pdfPath: "/work-experience/Work Experience Sheet - BOOKKEEPER.pdf",
    badge: "Master Bookkeeping",
    icon: "account_balance_wallet",
    iconColor: "text-secondary",
    summary:
      "Comprehensive breakdown of 9+ years as Bookkeeper maintaining General Journals, General Ledgers, daily cash books, loan portfolios, bank reconciliations, depreciation schedules, and tax compliance.",
    keyPoints: [
      "Ledger Hygiene: Maintained General Journal, General Ledger, Cash Book, and subsidiary ledgers with 100% balance accuracy",
      "Bank Reconciliation: Investigated discrepancies between bank and accounting records; managed daily deposits & cash flow",
      "Loan Accounting: Processed loan releases, repayments, interest calculations, penalties, and amortizations",
      "Financial Reporting: Prepared monthly/annual P&L, balance sheets, accruals, prepayments, and statutory tax schedules",
    ],
  },
  {
    id: "wes-msr",
    category: "wes",
    categoryLabel: "Work Experience Sheet",
    title: "Work Experience Sheet — Member Service Representative",
    issuer: "Social Security System (SSS), Oroquieta Branch",
    dateOrDuration: "Jan 2019 – Dec 2022 & Reliever (2023 – Present)",
    pdfPath: "/work-experience/Work Experience Sheet - Member Service Representative.pdf",
    badge: "Frontline Excellence",
    icon: "support_agent",
    iconColor: "text-tertiary",
    summary:
      "Frontline member claims processing (sickness, maternity, disability), salary & educational loans, pensioner confirmations (ACOP), data change verifications, and UMID biometric capture.",
    keyPoints: [
      "Award-Winning Service: Awarded Best Customer Service Employee (DBO Level & Division Level)",
      "Benefit Claims: Screened and processed complex claim applications ensuring regulatory completeness",
      "Loan Administration: Processed salary, educational, and pension loan applications",
      "Field Verification: Conducted field investigations for complex pensioner and death/disability claims",
    ],
  },
];

interface CertificateItem {
  id: string;
  category: "accounting" | "finance" | "ops";
  categoryLabel: string;
  title: string;
  issuer: string;
  badge: string;
  icon: string;
  iconColor: string;
  imageSrc: string;
  pdfPath?: string;
  idNumber: string;
  extraInfo: string;
  skills: string[];
  description: string;
}

const certificateData: CertificateItem[] = [
  {
    id: "quickbooks",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    title: "QuickBooks Training & Accounting Certification",
    issuer: "Intuit & Financial Training Academy",
    badge: "Verified Certificate",
    icon: "diamond",
    iconColor: "text-primary",
    imageSrc: "/certificate/Traing Cert- QUICKBOOKS.jpg",
    idNumber: "Cert ID #QB-84920",
    extraInfo: "Master ERP",
    skills: ["General Ledger", "Bank Feeds", "Accounts Payable/Receivable", "Automated Reconciliation"],
    description:
      "Advanced QuickBooks ledger configuration, chart of accounts setup, multi-bank feed automation, and full-cycle month-end financial statement close.",
  },
  {
    id: "xero",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    title: "Xero Cloud Accounting Specialist",
    issuer: "Xero Partner & Training Network",
    badge: "Certified Specialist",
    icon: "sync_alt",
    iconColor: "text-secondary",
    imageSrc: "/certificate/Training Cert- XERO.jpg",
    idNumber: "Cert ID #XR-91823",
    extraInfo: "Cloud Systems",
    skills: ["Cloud Bookkeeping", "Multi-Currency", "API Integrations", "Invoicing & Payroll"],
    description:
      "End-to-end cloud bookkeeping on Xero, automated transaction rules, foreign currency ledger translations, and custom financial report templates.",
  },
  {
    id: "coop-bookkeeping",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    title: "Cooperative Bookkeeping & Ledger Mastery",
    issuer: "Accounting Standards & Development Center",
    badge: "Verified & Active",
    icon: "account_balance_wallet",
    iconColor: "text-primary",
    imageSrc: "/certificate/cert of training-coop bookkeeping.jpg",
    idNumber: "Cert ID #CB-40192",
    extraInfo: "Statutory Standards",
    skills: ["Double-Entry Accounting", "Trial Balance", "Asset Depreciation", "Audit Readiness"],
    description:
      "Comprehensive double-entry bookkeeping, strict GAAP transaction classification, perpetual inventory adjustments, and statutory regulatory compliance.",
  },
  {
    id: "standardization-accts",
    category: "accounting",
    categoryLabel: "Accounting & ERP",
    title: "Standardization of Accounts & Reporting",
    issuer: "Corporate Financial Regulatory Training",
    badge: "Compliance Verified",
    icon: "verified",
    iconColor: "text-tertiary",
    imageSrc: "/certificate/cert of training-standardization of accts.jpg",
    idNumber: "Cert ID #SA-77310",
    extraInfo: "GAAP Architecture",
    skills: ["COA Architecture", "Financial Frameworks", "GAAP Conformity", "Statement Mapping"],
    description:
      "Structured Chart of Accounts (COA) taxonomy, uniform accounting standards, eliminations for inter-company ledgers, and institutional reporting hygiene.",
  },
  {
    id: "financial-mgt",
    category: "finance",
    categoryLabel: "Financial Management",
    title: "Executive Financial Management",
    issuer: "Institute for Financial & Corporate Management",
    badge: "Executive Level",
    icon: "monitoring",
    iconColor: "text-primary",
    imageSrc: "/certificate/cert of training-financial mgt.jpg",
    idNumber: "Cert ID #FM-62019",
    extraInfo: "Strategic Advisory",
    skills: ["Capital Optimization", "EBITDA Bridges", "Variance Analysis", "Financial KPIs"],
    description:
      "Executive capital allocation, working capital management, variance analysis vs forecast, and board-level management reporting packages.",
  },
  {
    id: "debt-budgeting",
    category: "finance",
    categoryLabel: "Financial Management",
    title: "Debt Management, Liquidity & Budgeting",
    issuer: "Treasury & Risk Management Institute",
    badge: "Fiduciary Specialization",
    icon: "trending_up",
    iconColor: "text-secondary",
    imageSrc: "/certificate/cert of training-debt mgt and budgeting.jpg",
    idNumber: "Cert ID #DM-55418",
    extraInfo: "Treasury & Cash",
    skills: ["13-Week Cash Flow", "Debt Covenants", "Runway Forecasting", "Scenario Modeling"],
    description:
      "Rolling 13-week dynamic cash forecasting, debt-service coverage ratio (DSCR) optimization, credit facility monitoring, and cash burn reduction.",
  },
  {
    id: "entrepreneurial-business-mgmt",
    category: "finance",
    categoryLabel: "Financial Management",
    title: "Entrepreneurial & Business Management",
    issuer: "Enterprise & Business Development Institute",
    badge: "Business Leadership",
    icon: "business_center",
    iconColor: "text-tertiary",
    imageSrc: "/certificate/cert-entrepreneurial-business-mgmt.jpg",
    pdfPath: "/certificate/cert of training - Entreprenuerial and Business Mgt.pdf",
    idNumber: "Cert ID #EBM-89241",
    extraInfo: "Business Growth",
    skills: ["Enterprise Management", "SME Operations", "Resource Allocation", "Managerial Accounting"],
    description:
      "Strategic training in enterprise operations, small-to-medium business sustainability, cash flow deployment, and managerial financial governance.",
  },
  {
    id: "pceap-admin",
    category: "ops",
    categoryLabel: "Executive Operations",
    title: "Proficiency Course for Exec & Admin Personnel",
    issuer: "Social Security System (SSS) / Training Division",
    badge: "Government Certified",
    icon: "workspace_premium",
    iconColor: "text-primary",
    imageSrc: "/certificate/cert-proficiency-course-exec-admin.jpg",
    pdfPath: "/certificate/2022.10.12-14 PROFICIENCY COURSE FOR EXECS AND ADMIN PERSONNEL.pdf",
    idNumber: "Cert ID #140113-PCEAP011022-0263",
    extraInfo: "Executive Governance",
    skills: ["Public Governance", "Administrative Operations", "Official Records", "Statutory Compliance"],
    description:
      "Executive 12-hour proficiency certification covering institutional public sector administrative governance, protocol handling, and official documentation systems.",
  },
  {
    id: "basic-va",
    category: "ops",
    categoryLabel: "Executive Operations",
    title: "Virtual Assistance & Executive Operations",
    issuer: "Executive Support & Virtual Management Academy",
    badge: "Operational Excellence",
    icon: "hub",
    iconColor: "text-tertiary",
    imageSrc: "/certificate/Traing Cert - Basic VA.jpg",
    idNumber: "Cert ID #VA-31084",
    extraInfo: "Remote Ops",
    skills: ["SOP Development", "Data Pipelines", "Executive Workflow", "Project Systems"],
    description:
      "High-efficiency remote controllership workflows, secure cloud collaboration architectures, standard operating procedures (SOPs), and pipeline hygiene.",
  },
  {
    id: "english-proficiency",
    category: "ops",
    categoryLabel: "Executive Operations",
    title: "Business English & Executive Communications",
    issuer: "Global Communication & Language Institute",
    badge: "Highest Standing",
    icon: "public",
    iconColor: "text-primary",
    imageSrc: "/certificate/Traing Cert - English Proficiency.jpg",
    idNumber: "Cert ID #EP-10928",
    extraInfo: "Global Standard",
    skills: ["Boardroom Reporting", "Audit Defense Memos", "Technical Writing", "Stakeholder Briefings"],
    description:
      "Precise boardroom communication, technical accounting memoranda authorship, cross-border client stakeholder relations, and audit committee presentations.",
  },
  {
    id: "customer-service",
    category: "ops",
    categoryLabel: "Executive Operations",
    title: "Client Relations & Fiduciary Service",
    issuer: "Professional Advisory Services Institute",
    badge: "Master Tier",
    icon: "handshake",
    iconColor: "text-secondary",
    imageSrc: "/certificate/cert of training-customer service.jpg",
    idNumber: "Cert ID #CS-88190",
    extraInfo: "Client Stewardship",
    skills: ["Client Retention", "Fiduciary Protocol", "Conflict Resolution", "Dispute Remediation"],
    description:
      "Client-centric financial stewardship, high-trust relationship management, conflict-free dispute resolution, and institutional service standard adherence.",
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
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
  const [selectedDocCategory, setSelectedDocCategory] = useState<DocCategory>("all");
  const [selectedCertCategory, setSelectedCertCategory] = useState<CredentialCategory>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<OfficialDoc | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceNeeded: "",
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
      const sections = ["intro", "about", "dossier", "experience", "tools", "certifications", "contact"];
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

  const filteredDocs = officialDocs.filter(
    (d) => selectedDocCategory === "all" || d.category === selectedDocCategory
  );

  const filteredCertificates = certificateData.filter(
    (c) => selectedCertCategory === "all" || c.category === selectedCertCategory
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const openDocViewer = (doc: OfficialDoc) => {
    setSelectedDoc(doc);
    setActiveModal("doc-viewer");
  };

  const openCertificateLightbox = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setActiveModal("certificate-lightbox");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface relative">
      {/* SCROLL PROGRESS INDICATOR BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-surface-dim z-[60] pointer-events-none">
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
            <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden border-2 border-primary/40 shadow-[0_0_15px_rgba(78,222,163,0.3)] group-hover:border-primary group-hover:scale-105 transition-all duration-200">
              <img
                src="/profile/avatar.jpg"
                alt="Ma. Faith B. Briones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md tracking-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                Ma. Faith B. Briones
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                BSA • CSE Eligible • Senior Bookkeeper
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            {[
              { id: "about", label: "Profile & Ethos" },
              { id: "dossier", label: "Official Dossier" },
              { id: "experience", label: "20-Yr Experience" },
              { id: "tools", label: "Accounting Stack" },
              { id: "certifications", label: "Certifications" },
              { id: "contact", label: "Contact & Retainer" },
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

          {/* Header Action & CTA */}
          <div className="flex items-center gap-space-md shrink-0">
            <a
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-label-md tracking-tight hover:bg-primary transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:-translate-y-0.5"
              href="#contact"
            >
              Get In Touch
            </a>

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
              Profile &amp; Ethos
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#dossier"
            >
              Official Verified Dossier (PDS, COE, WES)
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#experience"
            >
              20-Year Career &amp; Experience
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#tools"
            >
              Accounting Stack &amp; Systems
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2 border-b border-surface-container-low"
              href="#certifications"
            >
              Certifications &amp; Accreditations
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md py-2"
              href="#contact"
            >
              Contact &amp; Engagement
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-2.5 rounded-lg bg-primary text-on-primary font-semibold"
              href="#contact"
            >
              Direct Inquiry
            </a>
          </div>
        )}
      </header>

      <main className="w-full pt-20 bg-surface">
        {/* SECTION 1: HERO & EXECUTIVE PULSE */}
        <section className="relative w-full overflow-hidden pb-space-xl pt-space-lg" id="intro">
          {/* Ambient luminous gradients */}
          <div className="pointer-events-none absolute -left-48 top-0 h-[550px] w-[550px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow"></div>
          <div
            className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-secondary/8 blur-[160px] animate-pulse-glow"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Trust verification badge */}
            <Reveal delay={100}>
              <div className="mb-space-lg flex flex-wrap items-center gap-space-sm">
                <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-1 border border-primary/20 shadow-[0_0_15px_rgba(78,222,163,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    CIVIL SERVICE PROFESSIONAL ELIGIBLE (80.24%)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">|</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  BS in Accountancy Graduate (Andres Bonifacio College)
                </span>
                <span className="font-label-sm text-label-sm text-outline">|</span>
                <span className="font-label-sm text-label-sm text-secondary">
                  2023 Best Customer Service Awardee (Division Level)
                </span>
              </div>
            </Reveal>

            {/* Main Hero Grid */}
            <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center">
              {/* Left Column */}
              <div className="flex flex-col lg:col-span-7">
                <Reveal delay={150}>
                  <div className="space-y-space-xs">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                      Senior Bookkeeper • Financial Records Specialist • Administrative Lead
                    </span>
                    <h1 className="font-display-lg text-display-lg font-bold text-on-surface tracking-tight">
                      Ma. Faith B. Briones, <span className="text-primary font-display-lg text-display-lg">BSA, CSE</span>
                    </h1>
                  </div>
                </Reveal>

                <Reveal delay={250}>
                  <h2 className="mt-space-md font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
                    Over 20 Years of Fiduciary Precision in General Ledger Accounting, Microfinance Bookkeeping, and Public Administration.
                  </h2>
                </Reveal>

                <Reveal delay={350}>
                  <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    A seasoned Bachelor of Science in Accountancy graduate with over two decades of hands-on mastery. Proven track record across 12+ years in the Social Security System (SSS) handling public administration, financial vouchers, and award-winning member frontline operations, preceded by 9+ years managing microfinance loan ledgers, cooperative trial balances, and zero-variance bank reconciliations.
                  </p>
                </Reveal>

                {/* Executive CTAs */}
                <Reveal delay={450}>
                  <div className="mt-space-lg flex flex-wrap items-center gap-space-md">
                    <a
                      className="inline-flex items-center gap-space-xs rounded-lg bg-primary-container px-space-lg py-space-sm font-headline-sm text-label-md tracking-tight text-on-primary-container shadow-xl transition-all duration-200 hover:bg-primary hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:-translate-y-0.5"
                      href="#contact"
                    >
                      <span className="material-symbols-outlined text-title-md">send</span>
                      Direct Inquiry / Retain
                    </a>
                    <a
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container-high px-space-lg py-space-sm font-headline-sm text-label-md tracking-tight text-secondary shadow-md transition-all duration-200 hover:bg-surface-variant hover:text-on-surface hover:-translate-y-0.5"
                      href="#dossier"
                    >
                      <span className="material-symbols-outlined text-title-md">folder_shared</span>
                      Inspect Verified Dossier (PDFs)
                    </a>
                    <a
                      className="inline-flex items-center gap-space-xs rounded-lg bg-surface-container-low px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant transition-all hover:bg-surface-container hover:text-on-surface hover:-translate-y-0.5 border border-outline-variant/40 cursor-pointer"
                      href="/personal-data-sheet/PersonalDataSheet BRIONES.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-title-md">download</span>
                      Download PDS (CS Form 212)
                    </a>
                  </div>
                </Reveal>

                {/* Trust Badges Bar */}
                <Reveal delay={550}>
                  <div className="mt-space-xl grid grid-cols-2 gap-space-md sm:grid-cols-4">
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-primary">
                        <CountUp end={20} suffix="+ Yrs" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Professional Practice</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-on-surface">
                        <CountUp end={80.24} decimals={2} suffix="%" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">CSE Rating Score</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-secondary">
                        <CountUp end={12} suffix="+ Yrs" />
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">SSS Public Service</div>
                    </div>
                    <div className="card-hover-effect rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/60">
                      <div className="font-headline-md text-headline-md font-bold text-tertiary">2x Award</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Best Customer Service</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Key Professional Profile Summary Card */}
              <div className="relative lg:col-span-5">
                <Reveal delay={300} direction="scale">
                  <div className="relative mx-auto max-w-md lg:max-w-none space-y-space-md">
                    {/* Executive Credential Glass Card with Authentic Profile Portrait */}
                    <div className="rounded-2xl bg-surface-container p-space-lg shadow-2xl border border-surface-container-high/80 overflow-hidden relative group">
                      {/* Luminous background glow */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                      {/* Profile Image & Identification Header */}
                      <div className="relative mb-space-md rounded-xl overflow-hidden border border-surface-container-high/80 bg-surface-container-lowest shadow-lg">
                        <div className="relative aspect-[3/4] w-full max-h-[440px] overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                          <img
                            src="/profile/profile.jpg"
                            alt="Ma. Faith B. Briones, BSA, CSE"
                            className="w-full h-full object-cover object-[center_45%] filter brightness-[1.02] contrast-[1.02] group-hover:scale-102 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-black/20 opacity-60"></div>

                          {/* Floating Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                            <span className="rounded-full bg-surface-dim/90 backdrop-blur-md border border-surface-container-high px-2.5 py-1 font-label-sm text-[11px] text-secondary font-bold">
                              BSA • CSE ELIGIBLE
                            </span>
                            <span className="rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 px-2.5 py-1 font-label-sm text-[11px] text-primary font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">verified</span>
                              ACTIVE &amp; VERIFIED
                            </span>
                          </div>

                          {/* Floating Bottom Subtitle */}
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                            <span className="rounded-md bg-surface-dim/80 backdrop-blur-sm border border-surface-container-high/60 px-2.5 py-1 font-label-sm text-[11px] text-on-surface font-medium">
                              20+ Years Accounting &amp; Public Admin
                            </span>
                            <span className="rounded-md bg-tertiary/20 backdrop-blur-sm border border-tertiary/40 px-2.5 py-1 font-label-sm text-[11px] text-tertiary font-semibold">
                              SSS 12+ Yrs
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Header Title */}
                      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-headline-md text-primary">verified_user</span>
                          <div>
                            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Verified Credentials</h3>
                            <p className="font-label-sm text-label-sm text-secondary">Republic of the Philippines Official Records</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-space-md space-y-space-sm">
                        <div className="rounded-xl bg-surface-container-low p-space-sm border border-surface-container-high/50">
                          <div className="flex items-center justify-between font-label-sm text-label-sm">
                            <span className="text-secondary font-bold">DEGREE</span>
                            <span className="text-outline">Graduated 2004</span>
                          </div>
                          <p className="font-title-md text-title-md font-bold text-on-surface mt-0.5">
                            Bachelor of Science in Accountancy (BSA)
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Andres Bonifacio College, Dipolog City</p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-space-sm border border-surface-container-high/50">
                          <div className="flex items-center justify-between font-label-sm text-label-sm">
                            <span className="text-primary font-bold">CIVIL SERVICE ELIGIBILITY</span>
                            <span className="text-primary font-mono font-bold">80.24% Rating</span>
                          </div>
                          <p className="font-title-md text-title-md font-bold text-on-surface mt-0.5">
                            Career Service Professional Eligibility
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Conferred Oct 21, 2012 • Civil Service Commission
                          </p>
                        </div>

                        <div className="rounded-xl bg-surface-container-low p-space-sm border border-surface-container-high/50">
                          <div className="flex items-center justify-between font-label-sm text-label-sm">
                            <span className="text-tertiary font-bold">HONOR &amp; DISTINCTION</span>
                            <span className="text-secondary font-bold">2023 Winner</span>
                          </div>
                          <p className="font-title-md text-title-md font-bold text-on-surface mt-0.5">
                            Best Customer Service Employee
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Division Level Winner (Mindanao North Division) &amp; Branch Level Winner
                          </p>
                        </div>
                      </div>

                      {/* Quick Links to Documents */}
                      <div className="mt-space-md pt-space-xs border-t border-surface-container-high flex items-center justify-between font-label-sm text-label-sm">
                        <span className="text-outline">6 Verified PDF Documents Attached</span>
                        <a href="#dossier" className="text-primary font-semibold flex items-center gap-1 hover:underline">
                          View Dossier <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT & PROFESSIONAL PROFILE */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="about">
          <div className="mx-auto max-w-[1600px] px-margin">
            <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
              {/* Left Column: Narrative Statement */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <Reveal direction="left">
                  <div className="space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-title-md text-secondary">balance</span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                        Professional Ethos &amp; Background
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      Built on Double-Entry Precision and Two Decades of Fiduciary Trust.
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      My accounting discipline was built on foundational accountancy principles at Andres Bonifacio College and honed through 9+ years managing complex general ledgers in microfinance institutions and multi-purpose cooperatives across Western Mindanao.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      For the past 12+ years at the Social Security System (SSS), I have spearheaded core administrative support, financial disbursements, PIMS procurement, records archiving, and high-impact frontline member services. Whether handling corporate general ledgers, QuickBooks automated reconciliations, or institutional audit compliance, my focus remains unchanged: zero reconciliation variance, uncompromising integrity, and prompt, reliable execution.
                    </p>
                  </div>
                </Reveal>

                {/* Highlight Quotation Card */}
                <Reveal delay={200} direction="up">
                  <div className="mt-space-lg rounded-2xl bg-surface-container-low p-space-lg shadow-xl border border-surface-container-high/60 card-hover-effect">
                    <span className="material-symbols-outlined text-headline-md text-primary">format_quote</span>
                    <blockquote className="font-headline-sm text-headline-sm italic text-on-surface mt-2 leading-relaxed">
                      “Accountability, precision, and public trust are not just career standards—they are the bedrock of lasting financial integrity.”
                    </blockquote>
                    <div className="mt-space-md flex items-center gap-space-sm">
                      <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border-2 border-primary/50 shadow-md">
                        <img
                          src="/profile/avatar.jpg"
                          alt="Ma. Faith B. Briones"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-title-md text-title-md font-semibold text-on-surface">Ma. Faith B. Briones, BSA, CSE</p>
                        <p className="font-label-sm text-label-sm text-outline">Senior Bookkeeper &amp; Administrative Specialist</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: 3 Core Pillars */}
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
                            Full-Cycle General Ledger &amp; Bookkeeping Mastery
                          </h3>
                          <span className="font-label-sm text-label-sm text-primary font-semibold">9+ Yrs Lead Bookkeeper</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Expert maintenance of General Journals, General Ledgers, subsidiary ledgers, and cash books. Rigorous daily cash receipts recording, bank reconciliation with discrepancy investigations, loan disbursement schedules, and monthly/annual balance sheet roll-forwards.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            General Ledger Hygiene
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Bank Reconciliations
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Accruals &amp; Depreciation
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Microfinance Portfolios
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
                        <span className="material-symbols-outlined text-headline-md">admin_panel_settings</span>
                      </div>
                      <div className="space-y-space-xs flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-secondary transition-colors">
                            Public Administration, Procurement &amp; Financial Vouchers
                          </h3>
                          <span className="font-label-sm text-label-sm text-secondary font-semibold">12+ Yrs SSS Service</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Extensive experience in government administrative operations at the Social Security System: preparing payment vouchers with complete documentation, requisitioning supplies under PIMS procurement rules, inventory asset control, and HR attendance/leave tracking.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Voucher Processing
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            PIMS Procurement
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Records &amp; Archiving
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            QMS Standards
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
                        <span className="material-symbols-outlined text-headline-md">military_tech</span>
                      </div>
                      <div className="space-y-space-xs flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-tertiary transition-colors">
                            Award-Winning Member Services &amp; Stakeholder Relations
                          </h3>
                          <span className="font-label-sm text-label-sm text-tertiary font-semibold">2023 Division Winner</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Recognized as the 2023 Best Customer Service Employee at both Division Level (Mindanao North Division) and Branch Level. Expert in complex benefit claims verification (sickness, maternity, disability), loan processing, field investigations, and UMID capture.
                        </p>
                        <div className="pt-space-xs flex flex-wrap gap-space-xs">
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Benefit Claims Screening
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Salary &amp; Pension Loans
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            Field Investigation
                          </span>
                          <span className="rounded bg-surface-container-lowest px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/30">
                            ACOP Pensioner Confirmation
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

        {/* SECTION 3: VERIFIED OFFICIAL DOSSIER & DOCUMENTATION HUB */}
        <section className="w-full py-space-xl" id="dossier">
          <div className="mx-auto max-w-[1600px] px-margin">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                <div>
                  <div className="inline-flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-title-md text-primary">folder_shared</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                      Verified Official Dossier
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                    Official Employment Records &amp; Work Experience Sheets
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                    Structured breakdown of official government and corporate records with direct access to signed PDF documents. Click any document to view the full detailed breakdown and download.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high shadow-md">
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedDocCategory === "all"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedDocCategory("all")}
                  >
                    All Documents ({officialDocs.length})
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedDocCategory === "pds"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedDocCategory("pds")}
                  >
                    Personal Data Sheet (1)
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedDocCategory === "coe"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedDocCategory("coe")}
                  >
                    Certificates of Employment (2)
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedDocCategory === "wes"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedDocCategory("wes")}
                  >
                    Work Experience Sheets (3)
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredDocs.map((doc, idx) => (
                <Reveal key={doc.id} delay={idx * 75}>
                  <div
                    onClick={() => openDocViewer(doc)}
                    className="group card-hover-effect rounded-2xl bg-surface-container border border-surface-container-high/70 hover:border-primary/50 shadow-xl p-space-lg flex flex-col justify-between h-full cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-2 mb-space-sm">
                        <span className="rounded-full bg-surface-container-low px-2.5 py-1 font-label-sm text-label-sm text-secondary font-semibold border border-surface-container-high">
                          {doc.categoryLabel}
                        </span>
                        <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          {doc.badge}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                          <span className={`material-symbols-outlined text-[18px] ${doc.iconColor}`}>{doc.icon}</span>
                          <span className="truncate">{doc.issuer}</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>
                        <p className="font-label-sm text-label-sm text-secondary font-medium">{doc.dateOrDuration}</p>
                      </div>

                      {/* Summary */}
                      <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {doc.summary}
                      </p>

                      {/* Key Highlights List */}
                      <div className="mt-space-md space-y-1.5 pt-space-xs border-t border-surface-container-high/60">
                        {doc.keyPoints.slice(0, 3).map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 font-body-sm text-xs text-on-surface">
                            <span className="text-primary font-bold shrink-0">✓</span>
                            <span className="line-clamp-1">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Action Bar */}
                    <div className="mt-space-md pt-space-sm border-t border-surface-container-high/60 flex items-center justify-between font-label-sm text-label-sm">
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Inspect Breakdown &amp; PDF
                      </span>
                      <span className="text-outline font-mono">PDF Available</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: 20-YEAR CAREER & WORK EXPERIENCE TIMELINE */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="experience">
          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Header */}
            <Reveal>
              <div className="mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                  Two Decades of Public &amp; Private Excellence
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                  Career Trajectory &amp; Operational Leadership
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Chronological record spanning 12+ years at the Social Security System (SSS) and 9+ years managing microfinance and cooperative financial operations.
                </p>
              </div>
            </Reveal>

            {/* Experience Cards */}
            <div className="relative space-y-space-lg">
              {/* Role 1: SSS Admin & Reliever MSR */}
              <Reveal delay={150}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-primary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Junior Administrative Assistant &amp; Reliever Member Service Rep
                        </span>
                        <span className="rounded bg-primary/20 border border-primary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-primary">
                          Current Permanent Appointment
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">
                        Social Security System (SSS) • Oroquieta Branch
                      </p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      January 03, 2023 – Present
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Direct administrative, procurement, and financial voucher operations under Rosemary Grace P. Jadulos, CEO-I, while concurrently serving as Reliever Member Service Representative under Linda C. Vilar, CEO-II.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>Financial &amp; Procurement:</strong> Prepared payment vouchers with complete supporting documents and initiated procurement requisitions in full accordance with government procedures.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>HR &amp; Records Management:</strong> Managed employee attendance, timekeeping, leave processing, and structured administrative document archiving for prompt retrieval.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>Frontline Operations:</strong> Screened and processed membership registrations, Annual Confirmation of Pensioners (ACOP), data change requests, and field verifications.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Major Distinction</span>
                      <div className="space-y-space-xs my-space-xs">
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-primary">2023 Winner</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">Best Customer Service Employee (Division Level - MND)</span>
                        </div>
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-secondary">Branch Level</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">Best Customer Service Employee (DBO Oroquieta)</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">Verified Service Record</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 2: SSS Acting Junior MSR */}
              <Reveal delay={250}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-secondary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Acting Junior Member Service Representative
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">
                        Social Security System (SSS) • Member Services Section
                      </p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      January 03, 2019 – December 31, 2022
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Spearheaded member benefit claims intake, salary and pension loan applications, pensioner confirmations, and biometric UMID card capture.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Screened and verified sickness, maternity, and disability claims ensuring 100% statutory document completeness before processing.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Conducted field investigations on Fact of Death (FOD), Fact of Partnership (FOP), and Guardian verifications across the provincial jurisdiction.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span>Administered UMID biometric capturing and expedited manual data verification workflows for complex member records.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Scope &amp; Impact</span>
                      <div className="space-y-space-xs my-space-xs">
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-primary">1,000s</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">Benefit Claims Screened</span>
                        </div>
                        <div>
                          <span className="font-headline-md text-headline-md font-bold text-tertiary">4 Years</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant block">Acting Representative Lead</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">Zero Process Deficiencies</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Role 3: SSS Admin Assistant & Senior Clerk */}
              <Reveal delay={350}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-tertiary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Junior Administrative Assistant &amp; Senior Clerk
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">
                        Social Security System (SSS) • Admin &amp; Accounts Management Section
                      </p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      May 13, 2014 – December 31, 2018
                    </div>
                  </div>

                  <div className="mt-space-md space-y-space-xs">
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Generated monthly collection reports (R-3) and loan payments for employers; aided account officers in employer coverage and information drives; administered administrative procurement and UMID card releases under Juliet C. Abuton, Branch Head.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Role 4: Lead Bookkeeper across Cooperatives & Microfinance */}
              <Reveal delay={450}>
                <div className="relative rounded-2xl bg-surface-container p-space-lg shadow-lg border border-surface-container-high/70 card-hover-effect hover:border-primary/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm">
                    <div>
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="font-headline-md text-headline-md font-bold text-on-surface">
                          Lead Bookkeeper &amp; Accounting Specialist
                        </span>
                        <span className="rounded bg-secondary/20 border border-secondary/30 px-space-xs py-0.5 font-label-sm text-label-sm font-semibold text-secondary">
                          9+ Years Continuous Practice
                        </span>
                      </div>
                      <p className="font-title-md text-title-md text-secondary font-medium">
                        Taytay Sa Kauswagan, Inc. • Paglaum Multi-Purpose Coop • BASCOFAMCO
                      </p>
                    </div>
                    <div className="rounded-lg bg-surface-container-low px-space-sm py-1 font-label-md text-label-md text-outline border border-surface-container-high">
                      June 13, 2004 – October 10, 2013
                    </div>
                  </div>

                  <div className="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                    <div className="lg:col-span-8 space-y-space-xs">
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Full-cycle double-entry bookkeeping across microfinance institutions and multi-purpose cooperatives, maintaining books of accounts, subsidiary ledgers, loan portfolios, cash flow monitoring, and statutory reports.
                      </p>
                      <ul className="space-y-space-xs pt-space-xs">
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>General Ledger &amp; Cash Book:</strong> Maintained General Journal, General Ledger, Cash Book, daily cash collections, and deposit slips with daily balancing.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>Bank Reconciliation:</strong> Executed monthly bank reconciliations and audited ledger-to-bank discrepancies.</span>
                        </li>
                        <li className="flex items-start gap-space-xs font-body-sm text-body-sm text-on-surface">
                          <span className="material-symbols-outlined text-title-md text-primary shrink-0">check_circle</span>
                          <span><strong>Financial Schedules:</strong> Authored monthly/annual financial schedules (accruals, prepayments, asset depreciation, loan portfolio aging, and tax schedules).</span>
                        </li>
                      </ul>
                    </div>
                    <div className="lg:col-span-4 rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between border border-surface-container-high/60">
                      <span className="font-label-sm text-label-sm uppercase text-outline">Verified Institutions</span>
                      <div className="space-y-space-xs my-space-xs font-body-sm text-on-surface">
                        <div className="flex items-center gap-1.5">
                          <span className="text-primary font-bold">1.</span>
                          <span>Taytay Sa Kauswagan, Inc. (6.5+ Yrs)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-secondary font-bold">2.</span>
                          <span>Paglaum Multi-Purpose Coop</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-tertiary font-bold">3.</span>
                          <span>BASCOFAMCO</span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">100% Reconciled Ledgers</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 5: ACCOUNTING SYSTEMS & SOFTWARE STACK */}
        <section className="w-full py-space-xl" id="tools">
          <div className="mx-auto max-w-[1600px] px-margin">
            {/* Header */}
            <Reveal>
              <div className="mb-space-xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                  Systems &amp; Methodologies
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                  Financial Systems, Software Stack &amp; Governance
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Bridging modern cloud accounting software with rigorous statutory compliance, manual ledger fundamentals, and institutional public systems.
                </p>
              </div>
            </Reveal>

            {/* Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Matrix 1 */}
              <Reveal delay={100}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">account_balance</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Accounting &amp; GL</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Cloud and manual bookkeeping systems for complete financial statement preparation.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">QuickBooks Online</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Certified</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Xero Cloud Accounting</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Certified</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Cooperative Ledgers</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">9+ Yrs Master</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Double-Entry Accrual</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">GAAP</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Zero Variance Daily Balancing</span>
                </div>
              </Reveal>

              {/* Matrix 2 */}
              <Reveal delay={200}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-secondary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">policy</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Gov&apos;t &amp; Public Systems</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Specialized government databases, procurement portals, and member registry systems.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">SSS My.SSS Systems</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">12+ Yrs</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">PIMS Procurement</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">Trained</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">UMID Capture System</span>
                        <span className="rounded bg-secondary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-secondary font-semibold">Operator</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">ACOP Verification</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Lead</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Institutional Compliance</span>
                </div>
              </Reveal>

              {/* Matrix 3 */}
              <Reveal delay={300}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-tertiary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">table_view</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Spreadsheets &amp; Tools</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Data models, financial schedules, inventory databases, and reporting templates.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Microsoft Excel (Master)</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">Formulas/Models</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Cash Flow 13-Week</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">Trained</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Google Sheets &amp; Docs</span>
                        <span className="rounded bg-tertiary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary font-semibold">Cloud Sync</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Financial Schedules</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Accruals/Assets</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Structured Data Modeling</span>
                </div>
              </Reveal>

              {/* Matrix 4 */}
              <Reveal delay={400}>
                <div className="card-hover-effect rounded-2xl bg-surface-container p-space-lg shadow-lg flex flex-col justify-between border border-surface-container-high/60 h-full">
                  <div>
                    <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                      <span className="material-symbols-outlined text-headline-sm">security</span>
                      <span className="font-label-md text-label-md font-bold uppercase">Compliance &amp; Governance</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                      Statutory regulatory frameworks, data privacy, and anti-fraud protocols.
                    </p>
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">R.A. 10173 Data Privacy</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Compliant</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">SSS QMS Standards</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Trained</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">Risk &amp; Anti-Fraud</span>
                        <span className="rounded bg-primary/10 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-semibold">Trained</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-space-xs border border-surface-container-high/40">
                        <span className="font-title-md text-title-md text-on-surface font-medium">COA Standard Taxonomy</span>
                        <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-outline">Certified</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline mt-space-md block">Audited Confidentiality</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 6: VERIFIED TRAINING CERTIFICATIONS (THE 9 CERTIFICATE IMAGES) */}
        <section className="w-full bg-surface-container-lowest py-space-xl border-y border-surface-container-high/30" id="certifications">
          <div className="mx-auto max-w-[1600px] px-margin">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                <div>
                  <div className="inline-flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-title-md text-primary">military_tech</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                      Training Credentials
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
                    Verified Professional Certifications &amp; Accreditations
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                    Authentic training credentials across ERP accounting systems, cooperative bookkeeping, financial management, virtual operations, and executive communication. Click any credential to inspect the high-resolution certificate.
                  </p>
                </div>

                {/* Filter Pill Tabs */}
                <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high shadow-md">
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedCertCategory === "all"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedCertCategory("all")}
                  >
                    All Proofs ({certificateData.length})
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedCertCategory === "accounting"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedCertCategory("accounting")}
                  >
                    Accounting &amp; ERP (4)
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedCertCategory === "finance"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedCertCategory("finance")}
                  >
                    Finance &amp; Strategy (3)
                  </button>
                  <button
                    className={`rounded-lg px-space-md py-1.5 font-label-sm text-label-sm transition-all duration-200 cursor-pointer ${
                      selectedCertCategory === "ops"
                        ? "bg-primary text-on-primary font-semibold shadow-[0_0_15px_rgba(78,222,163,0.35)] scale-105"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                    onClick={() => setSelectedCertCategory("ops")}
                  >
                    Operations &amp; Governance (4)
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Balanced 3x3 Grid with Certificate Picture Previews & Lightbox */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredCertificates.map((cert, idx) => (
                <Reveal key={cert.id} delay={idx * 75}>
                  <div
                    onClick={() => openCertificateLightbox(cert)}
                    className="group card-hover-effect rounded-2xl bg-surface-container border border-surface-container-high/70 hover:border-primary/50 shadow-xl overflow-hidden flex flex-col justify-between h-full cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  >
                    <div>
                      {/* Certificate Visual Image Frame with Zoom Hover Effect */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface-container-lowest border-b border-surface-container-high/60 group">
                        <img
                          alt={cert.title}
                          src={cert.imageSrc}
                          className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.03] group-hover:scale-108 group-hover:brightness-100 transition-all duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity"></div>

                        {/* Top floating badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="rounded-full bg-surface-dim/90 backdrop-blur-md border border-surface-container-high px-2.5 py-1 font-label-sm text-label-sm text-secondary font-semibold">
                            {cert.categoryLabel}
                          </span>
                          <span className="rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 px-2.5 py-1 font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            {cert.badge}
                          </span>
                        </div>

                        {/* Hover Lightbox Indicator Banner */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-surface-dim/60 backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Inspect High-Res Certificate
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                          <span className={`material-symbols-outlined text-[18px] ${cert.iconColor}`}>{cert.icon}</span>
                          <span>{cert.issuer}</span>
                        </div>

                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                          {cert.title}
                        </h3>

                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>

                        {/* Skill Tags */}
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {cert.skills.slice(0, 3).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="rounded bg-surface-container-low border border-outline-variant/30 px-2 py-0.5 font-label-sm text-[11px] text-on-surface-variant"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Bar */}
                    <div className="mx-space-md mb-space-md mt-2 pt-space-xs border-t border-surface-container-high/50 flex items-center justify-between font-label-sm text-label-sm">
                      <span className="text-outline font-mono">{cert.idNumber}</span>
                      <span className="text-primary font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        Enlarge <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT & RETAINER INQUIRY */}
        <section className="relative w-full py-space-xl" id="contact">
          <div className="mx-auto max-w-[1600px] px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              {/* Left Column: Direct Inquiry Information */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <Reveal direction="left">
                  <div className="space-y-space-md">
                    <div className="inline-flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-title-md text-primary">handshake</span>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                        Professional Inquiry &amp; Retainer
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      Engage Proven Bookkeeping, GL Reconciliation &amp; Administrative Support
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      Available for high-stakes bookkeeping mandates, QuickBooks/Xero ledger catch-up, monthly accrual closes, SSS process advisory, and executive virtual administrative assistance.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Backed by 20+ years of verified compliance, permanent government tenure, and an unblemished fiduciary audit record.
                    </p>

                    {/* Direct Contact List */}
                    <div className="mt-space-lg space-y-space-sm rounded-xl bg-surface-container p-space-md border border-surface-container-high/60 card-hover-effect">
                      <div className="flex items-center gap-space-sm pb-space-sm border-b border-surface-container-high/60">
                        <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border-2 border-primary/50 shadow-md">
                          <img
                            src="/profile/avatar.jpg"
                            alt="Ma. Faith B. Briones"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-title-md text-title-md font-bold text-on-surface">Ma. Faith B. Briones, BSA, CSE</p>
                          <p className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-primary inline-block animate-pulse"></span>
                            Available for Bookkeeping Mandates &amp; Advisory
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-space-sm pt-1">
                        <span className="material-symbols-outlined text-headline-sm text-primary">mail</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Direct Government / Official Email</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">brionesmb@sss.gov.ph</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-headline-sm text-secondary">phone_in_talk</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Official Contact Mobile</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">+63 951 578 4797</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-headline-sm text-tertiary">location_on</span>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline">Location</span>
                          <p className="font-title-md text-title-md text-on-surface font-medium">
                            Oroquieta City, Misamis Occidental, Philippines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Professional Accord Notice */}
                <Reveal delay={200} direction="up">
                  <div className="mt-space-lg rounded-xl bg-surface-container-low p-space-md border border-surface-container-high/50 card-hover-effect">
                    <span className="font-label-sm text-label-sm font-bold text-secondary">FIDUCIARY &amp; CONFIDENTIALITY ACCORD</span>
                    <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                      All financial records, corporate ledgers, and consultation inquiries are processed with strict confidentiality adhering to the Data Privacy Act of 2012 (R.A. 10173) and professional accountancy standards.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Intake Inquiry Form */}
              <div className="lg:col-span-7">
                <Reveal delay={200} direction="scale">
                  <div className="rounded-2xl bg-surface-container p-space-xl shadow-2xl border border-surface-container-high/80">
                    <div className="flex items-center justify-between mb-space-md">
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Direct Service &amp; Consultation Inquiry
                      </h3>
                      <span className="rounded bg-primary/10 border border-primary/30 px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        Confidential &amp; Direct
                      </span>
                    </div>

                    {formSubmitted ? (
                      <div className="rounded-xl bg-primary/10 border border-primary/30 p-space-lg text-center space-y-space-sm animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-2 animate-bounce">
                          <span className="material-symbols-outlined text-display-lg text-primary">verified</span>
                        </div>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary block">
                          Inquiry Transmitted Successfully
                        </span>
                        <p className="font-body-md text-body-md text-on-surface max-w-lg mx-auto">
                          Thank you, <strong className="text-secondary">{formData.fullName || "Partner"}</strong>. Your message regarding{" "}
                          <strong className="text-primary">{formData.serviceNeeded || "your financial requirements"}</strong> has been received. Ma. Faith B. Briones will review your context and respond promptly.
                        </p>
                        <button
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              fullName: "",
                              companyName: "",
                              email: "",
                              phone: "",
                              serviceNeeded: "",
                              context: "",
                              ndaAgreed: false,
                            });
                          }}
                          className="mt-4 inline-flex items-center gap-2 px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-space-md" onSubmit={handleFormSubmit}>
                        {/* Name & Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Your Full Name *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="e.g. John Doe"
                              required
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Organization / Enterprise</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="e.g. Acme Corp / Cooperative"
                              type="text"
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Email Address *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="name@organization.com"
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-space-xs">
                            <label className="font-label-sm text-label-sm text-on-surface font-medium">Contact Number *</label>
                            <input
                              className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              placeholder="+63 900 000 0000"
                              required
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Service Scope Needed */}
                        <div className="space-y-space-xs">
                          <label className="font-label-sm text-label-sm text-on-surface font-medium">Service / Requirement Scope *</label>
                          <select
                            className="h-10 w-full rounded-lg bg-surface-container-low px-space-sm font-body-sm text-on-surface border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                            required
                            value={formData.serviceNeeded}
                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                          >
                            <option disabled value="">Select Requirement</option>
                            <option value="bookkeeping">Full-Cycle Bookkeeping &amp; General Ledger Management</option>
                            <option value="reconciliation">Bank Reconciliation &amp; Ledger Catch-Up Cleanup</option>
                            <option value="quickbooks-xero">QuickBooks Online / Xero Cloud Setup &amp; Migration</option>
                            <option value="cooperative-accounting">Cooperative &amp; Microfinance Loan Portfolio Accounting</option>
                            <option value="admin-support">Executive Virtual Assistance &amp; Administrative Support</option>
                            <option value="consultation">Financial Records Consultation &amp; Compliance Audit</option>
                          </select>
                        </div>

                        {/* Brief Context */}
                        <div className="space-y-space-xs">
                          <label className="font-label-sm text-label-sm text-on-surface font-medium">
                            Details / Project Context
                          </label>
                          <textarea
                            className="w-full rounded-lg bg-surface-container-low p-space-sm font-body-sm text-on-surface placeholder:text-outline border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                            placeholder="Please share details about your transaction volume, existing software, timeline, or requirements..."
                            rows={3}
                            value={formData.context}
                            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                          ></textarea>
                        </div>

                        {/* Accord Checkbox */}
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
                            I understand that all communications and shared documentation are safeguarded under strict statutory confidentiality.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          className="w-full rounded-lg bg-primary-container py-space-sm font-headline-sm text-label-md tracking-tight text-on-primary-container shadow-xl transition-all duration-200 hover:bg-primary hover:shadow-[0_0_25px_rgba(78,222,163,0.4)] cursor-pointer font-bold hover:-translate-y-0.5"
                          type="submit"
                        >
                          Submit Consultation Inquiry
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
                Ma. Faith Batilona Briones, BSA, CSE
              </span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-secondary border border-secondary/20">
                CSE Professional (80.24%)
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline max-w-xl">
              Bachelor of Science in Accountancy • 20+ Years Accounting, Microfinance Bookkeeping, and Public Administration. Conferred by the Civil Service Commission and Andres Bonifacio College.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-space-xs">
            <div className="flex items-center gap-space-md flex-wrap">
              <a
                href="/personal-data-sheet/PersonalDataSheet BRIONES.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                PDS (CS Form 212)
              </a>
              <span className="text-outline-variant">•</span>
              <a
                href="#dossier"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Work Experience Sheets
              </a>
              <span className="text-outline-variant">•</span>
              <a
                href="#certifications"
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Certificates
              </a>
            </div>
            <p className="font-label-sm text-label-sm text-outline">
              &copy; {new Date().getFullYear()} Ma. Faith B. Briones. All Fiduciary Rights Reserved.
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
            <span className="material-symbols-outlined text-[16px]">send</span>
            Direct Inquiry
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
          onClick={() => {
            setActiveModal(null);
            setSelectedCertificate(null);
            setSelectedDoc(null);
          }}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-surface-container p-space-lg shadow-2xl border border-surface-container-high max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setActiveModal(null);
                setSelectedCertificate(null);
                setSelectedDoc(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer z-10"
            >
              <span className="material-symbols-outlined text-title-md">close</span>
            </button>

            {/* DOCUMENT VIEWER MODAL */}
            {activeModal === "doc-viewer" && selectedDoc && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className={`material-symbols-outlined text-headline-md ${selectedDoc.iconColor}`}>
                    {selectedDoc.icon}
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {selectedDoc.title}
                    </h3>
                    <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                      {selectedDoc.issuer} • {selectedDoc.dateOrDuration}
                    </p>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high space-y-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Official Summary
                  </span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {selectedDoc.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Key Highlights &amp; Scope of Responsibilities
                  </span>
                  <div className="space-y-2">
                    {selectedDoc.keyPoints.map((pt, i) => (
                      <div
                        key={i}
                        className="p-space-xs rounded-lg bg-surface-container-low border border-surface-container-high/50 flex items-start gap-2 font-body-sm text-sm text-on-surface-variant"
                      >
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center flex-wrap gap-2 border-t border-surface-container-high/60">
                  <span className="font-label-sm text-label-sm text-outline">
                    Status: <span className="text-primary font-bold">Official Signed Document</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer hover:bg-surface-bright transition-colors"
                    >
                      Close Viewer
                    </button>
                    <a
                      href={selectedDoc.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      Open Official PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATE LIGHTBOX MODAL */}
            {activeModal === "certificate-lightbox" && selectedCertificate && (
              <div className="space-y-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className={`material-symbols-outlined text-headline-md ${selectedCertificate.iconColor}`}>
                    {selectedCertificate.icon}
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      {selectedCertificate.title}
                    </h3>
                    <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                      {selectedCertificate.issuer} • {selectedCertificate.idNumber}
                    </p>
                  </div>
                </div>

                {/* High Resolution Image Preview */}
                <div className="rounded-xl overflow-hidden bg-black/90 border border-surface-container-highest shadow-2xl flex items-center justify-center max-h-[550px]">
                  <img
                    alt={selectedCertificate.title}
                    src={selectedCertificate.imageSrc}
                    className="w-full h-auto max-h-[540px] object-contain"
                  />
                </div>

                {/* Description & Competencies */}
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-surface-container-high px-2.5 py-1 font-label-sm text-xs text-primary font-medium border border-primary/20"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center flex-wrap gap-2 border-t border-surface-container-high/60">
                  <span className="font-label-sm text-label-sm text-outline">
                    Status: <span className="text-primary font-bold">Verified &amp; Active</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer hover:bg-surface-bright transition-colors"
                    >
                      Close Viewer
                    </button>
                    {selectedCertificate.pdfPath && (
                      <a
                        href={selectedCertificate.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-surface-container-highest text-primary border border-primary/30 font-label-md text-label-md font-semibold hover:bg-primary/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                        Open Original PDF
                      </a>
                    )}
                    <a
                      href={selectedCertificate.imageSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Open Full Size
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
