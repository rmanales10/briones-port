"use client";

import React, { useState, useEffect, useRef } from "react";

type DocCategory = "all" | "pds" | "coe" | "wes";
type CredentialCategory = "all" | "accounting" | "finance" | "ops";
type CareerCategory = "all" | "gov" | "private";

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
  summary: string;
  keyPoints: string[];
  supervisors?: string;
}

const officialDocs: OfficialDoc[] = [
  {
    id: "pds",
    category: "pds",
    categoryLabel: "Civil Service Record",
    title: "Personal Data Sheet (CS Form No. 212)",
    issuer: "Civil Service Commission • Republic of the Philippines",
    dateOrDuration: "Official Statutory Record • Conferred 2025",
    pdfPath: "/personal-data-sheet/PersonalDataSheet BRIONES.pdf",
    badge: "Official CSC Record",
    icon: "badge",
    summary:
      "Statutory government dossier documenting Bachelor of Science in Accountancy (Andres Bonifacio College, 2004), Career Service Professional Eligibility (80.24% rating), 20+ years continuous employment record, and executive public sector training interventions.",
    keyPoints: [
      "Education: Bachelor of Science in Accountancy (2000–2004, Andres Bonifacio College)",
      "Civil Service Eligibility: CSE Professional (Rating: 80.24%, Conferred Oct 21, 2012)",
      "Awards: 2023 Best Customer Service Employee (Division Level Winner & DBO Level Winner)",
      "Executive L&D: Data Privacy Act (R.A. 10173), Risk Management, QMS Deployment, PIMS Procurement",
    ],
  },
  {
    id: "coe-tski",
    category: "coe",
    categoryLabel: "Certificate of Employment",
    title: "Certificate of Employment — Taytay Sa Kauswagan, Inc.",
    issuer: "Taytay Sa Kauswagan, Incorporated (TSKI) • ISO 9001 Certified",
    dateOrDuration: "Jan 23, 2006 – Aug 8, 2012 (6.5+ Years)",
    pdfPath: "/certificate-of-employment/Certificate fo Employment - TSK, Incorporated.pdf",
    badge: "Permanent Bookkeeper",
    icon: "account_balance",
    summary:
      "Verified microfinance and corporate bookkeeping employment record over 6.5 years managing full-cycle general ledgers, loan disbursements, daily cash collections, and branch balance sheets.",
    keyPoints: [
      "Designation: Bookkeeper (Liloy Branch)",
      "Status: Permanent / Resigned in Good Standing",
      "Corporate Scope: Microfinance loan portfolio accounting, daily cash reconciliation, and branch audit readiness",
      "Issued by: Beverly Joy M. Navigar, HR Manager",
    ],
    supervisors: "Beverly Joy M. Navigar (HR Manager)",
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
    icon: "account_balance_wallet",
    summary:
      "Statutory employment certification as Bookkeeper for Plaridel Service Cooperative (PLASECO), subsidiary of Paglaum MPC (CDA Reg. No. 9520-10005976).",
    keyPoints: [
      "Designation: Bookkeeper (Plaridel Service Cooperative)",
      "Coverage: Cooperative financial ledgers, member savings/shares records, and loan transactions",
      "Issued by: Maria Theresa A. Salabas, HR/Admin Officer",
    ],
    supervisors: "Maria Theresa A. Salabas (HR/Admin Officer)",
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
    icon: "admin_panel_settings",
    summary:
      "Detailed actual duties covering administrative operations, financial disbursement vouchers, PIMS procurement, inventory control, HR attendance/leave administration, and UMID card releases.",
    keyPoints: [
      "Financial & Procurement: Prepared vouchers and complete supporting documents for payment processing; initiated supplies/equipment procurement requisitions",
      "Budget Planning: Assisted in administrative budget planning and prioritization",
      "Asset & Inventory: Maintained inventory of office supplies, furniture, and equipment with systematic tracking",
      "Client Service: Facilitated UMID card releases and resolved administrative inquiries",
    ],
    supervisors: "Juliet C. Abuton (Branch Head) / Rosemary Grace P. Jadulos (CEO-I)",
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
    icon: "fact_check",
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
    summary:
      "Frontline member claims processing (sickness, maternity, disability, retirement, funeral), salary & educational loans, pensioner confirmations (ACOP), data change verifications, and UMID biometric capture.",
    keyPoints: [
      "Award-Winning Service: Awarded Best Customer Service Employee (DBO Level & Division Level)",
      "Benefit Claims: Screened and processed complex claim applications ensuring regulatory completeness",
      "Loan Administration: Processed salary, educational, and pension loan applications",
      "Field Verification: Conducted field investigations for complex pensioner and death/disability claims",
    ],
    supervisors: "Juliet C. Abuton (Branch Head) / Linda C. Vilar (CEO-II)",
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
    badge: "Verified Certification",
    icon: "diamond",
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
    badge: "Statutory Standards",
    icon: "account_balance_wallet",
    imageSrc: "/certificate/cert of training-coop bookkeeping.jpg",
    idNumber: "Cert ID #CB-40192",
    extraInfo: "Regulatory Hygiene",
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
    badge: "GAAP Architecture",
    icon: "verified",
    imageSrc: "/certificate/cert of training-standardization of accts.jpg",
    idNumber: "Cert ID #SA-77310",
    extraInfo: "COA Hygiene",
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
    imageSrc: "/certificate/cert of training-customer service.jpg",
    idNumber: "Cert ID #CS-88190",
    extraInfo: "Client Stewardship",
    skills: ["Client Retention", "Fiduciary Protocol", "Conflict Resolution", "Dispute Remediation"],
    description:
      "Client-centric financial stewardship, high-trust relationship management, conflict-free dispute resolution, and institutional service standard adherence.",
  },
];

interface CareerRole {
  id: string;
  category: "gov" | "private";
  role: string;
  organization: string;
  location: string;
  period: string;
  badge: string;
  badgeColor: string;
  summary: string;
  highlights: string[];
  supervisors?: string;
  tags: string[];
}

const careerRoles: CareerRole[] = [
  {
    id: "sss-admin",
    category: "gov",
    role: "Junior Administrative Assistant (Administration & Procurement)",
    organization: "Social Security System (SSS)",
    location: "Oroquieta Branch, Misamis Occidental",
    period: "Jan 2023 – Present & Aug 2015 – Dec 2018",
    badge: "Public Administration",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    summary:
      "Responsible for core branch administrative operations, financial disbursement vouchers with complete statutory audit attachments, annual administrative budget prioritizations, PIMS supplies procurement, property asset registers, and UMID card releases.",
    highlights: [
      "Prepared payment vouchers for branch operating expenses, utility accounts, and building maintenance vendors with zero audit findings.",
      "Managed supplies and equipment requisitions through the Property and Inventory Management System (PIMS).",
      "Maintained accurate property inventory cards and physical asset tracking for all branch equipment.",
      "Facilitated seamless UMID identity card validations and member administrative query resolutions.",
    ],
    supervisors: "Juliet C. Abuton (Branch Head) / Rosemary Grace P. Jadulos (CEO-I)",
    tags: ["Disbursement Vouchers", "PIMS Procurement", "Asset Management", "QMS Compliance"],
  },
  {
    id: "sss-msr",
    category: "gov",
    role: "Member Service Representative (Claims, Loans & Frontline)",
    organization: "Social Security System (SSS)",
    location: "Oroquieta Branch, Misamis Occidental",
    period: "Jan 2019 – Dec 2022 & Reliever (2023 – Present)",
    badge: "2023 Division Awardee",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    summary:
      "Frontline leadership in screening, evaluating, and processing complex member benefit claims (sickness, maternity, disability, retirement, funeral), loan applications, and annual confirmation of pensioners (ACOP). Awarded 2023 Best Customer Service Employee at the Division Level.",
    highlights: [
      "Conferred 2023 Best Customer Service Employee (Division Level Winner - Mindanao North Division & DBO Level Winner).",
      "Processed hundreds of benefit claim applications monthly with zero backlogs and 100% regulatory compliance.",
      "Screened member salary, educational, and pension loan applications ensuring document authenticity.",
      "Conducted on-site field verifications for complex disability, death, and pensioner status claims.",
    ],
    supervisors: "Juliet C. Abuton (Branch Head) / Linda C. Vilar (CEO-II)",
    tags: ["Benefit Claims", "ACOP Verifications", "Loan Administration", "Frontline Excellence"],
  },
  {
    id: "tski-bookkeeper",
    category: "private",
    role: "Lead Bookkeeper (General Ledger & Microfinance Portfolios)",
    organization: "Taytay Sa Kauswagan, Incorporated (TSKI)",
    location: "Liloy Branch, Zamboanga del Norte",
    period: "Jan 23, 2006 – Aug 8, 2012 (6.5+ Years)",
    badge: "Lead Bookkeeper",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    summary:
      "Full-charge branch bookkeeper managing multi-million peso microfinance loan portfolios, double-entry general ledgers, cash book balances, daily bank deposits, and month-end financial closures under ISO 9001 quality systems.",
    highlights: [
      "Maintained General Journal, General Ledger, Cash Receipts, and Cash Disbursements registers with 100% mathematical accuracy.",
      "Executed daily cash counts, bank deposit verifications, and monthly bank reconciliation schedules with zero variances.",
      "Calculated loan releases, principal amortizations, interest yields, and penalty schedules for extensive microfinance borrower accounts.",
      "Prepared monthly Trial Balances, P&L statements, and Balance Sheet schedules for executive regional reviews.",
    ],
    supervisors: "Beverly Joy M. Navigar (HR Manager)",
    tags: ["General Ledger", "Bank Reconciliation", "Loan Accounting", "Microfinance Audit"],
  },
  {
    id: "paglaum-bookkeeper",
    category: "private",
    role: "Cooperative Bookkeeper (PLASECO)",
    organization: "Paglaum Multi-Purpose Cooperative",
    location: "Plaridel, Misamis Occidental",
    period: "Dec 10, 2012 – Oct 10, 2013",
    badge: "Cooperative Accounting",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    summary:
      "Maintained statutory cooperative ledgers, member share capital accounts, loan ledgers, and financial statements in strict conformity with Cooperative Development Authority (CDA) regulatory frameworks.",
    highlights: [
      "Managed subsidiary ledgers for member savings, time deposits, and share capital equity.",
      "Prepared trial balances and statutory financial schedules for annual cooperative audits.",
    ],
    supervisors: "Maria Theresa A. Salabas (HR/Admin Officer)",
    tags: ["Cooperative Ledgers", "CDA Compliance", "Share Capital", "Trial Balance"],
  },
  {
    id: "bascofamco-bookkeeper",
    category: "private",
    role: "Cooperative Bookkeeper",
    organization: "BASCOFAMCO",
    location: "Misamis Occidental",
    period: "June 13, 2004 – Aug 31, 2005",
    badge: "Early Career Foundation",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    summary:
      "Early career accounting foundation following graduation from Andres Bonifacio College: managed daily cash receipts, disbursement journals, and cooperative bookkeeping registers.",
    highlights: [
      "Applied foundational BS Accountancy principles to full-cycle double-entry bookkeeping.",
    ],
    tags: ["Double-Entry Accounting", "Cash Journals", "Voucher Registers"],
  },
];

// Reusable Scroll-Reveal Animation Component
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
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.08 }
    );

    const currentDom = domRef.current;
    if (currentDom) observer.observe(currentDom);

    return () => {
      if (currentDom) observer.unobserve(currentDom);
    };
  }, []);

  let transformClass = "translate-y-6";
  if (direction === "left") transformClass = "-translate-x-6";
  if (direction === "right") transformClass = "translate-x-6";
  if (direction === "scale") transformClass = "scale-95";

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : `opacity-0 ${transformClass}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Animated Counter Component
function CountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(easeOutQuart * end);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [selectedDocCategory, setSelectedDocCategory] = useState<DocCategory>("all");
  const [selectedCertCategory, setSelectedCertCategory] = useState<CredentialCategory>("all");
  const [selectedCareerCategory, setSelectedCareerCategory] = useState<CareerCategory>("all");
  const [expandedRoleId, setExpandedRoleId] = useState<string>("sss-admin");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number>(0);
  const [selectedDoc, setSelectedDoc] = useState<OfficialDoc | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setShowBackToTop(currentScroll > 400);

      const sections = ["overview", "provenance", "dossier", "stack", "credentials", "contact"];
      const scrollPosition = currentScroll + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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

  const filteredCareerRoles = careerRoles.filter(
    (r) => selectedCareerCategory === "all" || r.category === selectedCareerCategory
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const openDocViewer = (doc: OfficialDoc) => {
    setSelectedDoc(doc);
    setActiveModal("doc-viewer");
  };

  const openCertificateLightbox = (certIndex: number) => {
    setSelectedCertificateIndex(certIndex);
    setActiveModal("certificate-lightbox");
  };

  const nextCertificate = () => {
    setSelectedCertificateIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const prevCertificate = () => {
    setSelectedCertificateIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentCert = filteredCertificates[selectedCertificateIndex] || filteredCertificates[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#090D16] text-[#E2E8F0] relative selection:bg-[#D4AF37] selection:text-[#090D16]">
      {/* Top Ambient Light Flare */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none z-0"></div>

      {/* Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-[0_0_10px_rgba(212,175,55,0.7)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* FLOATING ISLAND HEADER */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto h-16 rounded-full bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Identity Pill */}
          <a href="#overview" className="flex items-center gap-3 shrink-0 group">
            <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border border-amber-400/40 shadow-md group-hover:scale-105 transition-transform">
              <img
                src="/profile/avatar.jpg"
                alt="Ma. Faith B. Briones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                Ma. Faith B. Briones
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wide">
                BSA • CSE 80.24% • Senior Bookkeeper
              </span>
            </div>
          </a>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300">
            {[
              { id: "overview", label: "Overview" },
              { id: "provenance", label: "Experience" },
              { id: "dossier", label: "Dossier & PDFs" },
              { id: "stack", label: "Systems & Standards" },
              { id: "credentials", label: "Certificates" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-105 transition-all"
            >
              <span>Get In Touch</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 text-slate-200 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-3xl bg-[#0F172A] border border-white/10 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {[
              { id: "overview", label: "Overview" },
              { id: "provenance", label: "Experience & Timeline" },
              { id: "dossier", label: "Official Dossier & PDFs" },
              { id: "stack", label: "Accounting Systems & Stack" },
              { id: "credentials", label: "Verified Certificates" },
              { id: "contact", label: "Direct Engagement" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  activeSection === item.id ? "bg-amber-400/20 text-amber-300 font-semibold" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold mt-2"
            >
              Request Consultation
            </a>
          </div>
        )}
      </header>

      <main className="w-full pt-28 pb-20 space-y-24">
        {/* SECTION 1: MODERN BENTO HERO */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="overview">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Bento 1: Primary Identity & Pitch (Col-span 7) */}
            <Reveal className="lg:col-span-7 flex">
              <div className="bento-card w-full rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                      Civil Service Professional (80.24%)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
                      BS in Accountancy Graduate
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                    Ma. Faith B. Briones, <span className="gold-gradient-text">BSA, CSE</span>
                  </h1>

                  <p className="text-base text-slate-300 leading-relaxed">
                    Over 20 years of hands-on fiduciary excellence in General Ledger accounting, zero-variance bank reconciliations, microfinance loan ledgers, and Social Security System (SSS) public administration.
                  </p>
                </div>

                {/* Key Pillars Tags */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      📊 Full-Cycle General Ledger
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      🏛️ 12+ Yrs SSS Administration
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      🏆 2023 Best Customer Service Awardee
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      💼 QuickBooks &amp; Xero ERP
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="#dossier"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-300 hover:scale-105 transition-all"
                    >
                      <span className="material-symbols-outlined text-base">folder_open</span>
                      Explore Verified Dossier
                    </a>
                    <a
                      href="/personal-data-sheet/PersonalDataSheet BRIONES.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">download</span>
                      Download PDS (CS Form 212)
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento 2: Portrait & Verified Status (Col-span 5) */}
            <Reveal delay={150} direction="scale" className="lg:col-span-5 flex">
              <div className="bento-card w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 relative overflow-hidden group">
                {/* Photo Frame with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-xl">
                  <img
                    src="/profile/profile.jpg"
                    alt="Ma. Faith B. Briones, BSA, CSE"
                    className="w-full h-full object-cover object-[center_45%] group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-300">
                      BSA • 80.24% CSE
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      ACTIVE RECORD
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">Ma. Faith B. Briones</p>
                    <p className="text-xs text-slate-300">Senior Bookkeeper &amp; Fiduciary Specialist</p>
                  </div>
                </div>

                {/* Micro Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Graduated</span>
                    <span className="text-slate-200 font-semibold">Andres Bonifacio Coll.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Eligibility Conferred</span>
                    <span className="text-amber-300 font-semibold">Civil Service Prof.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento 3: 4 Key Interactive Metric Cards (12 cols) */}
            <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: 20, suffix: "+ Yrs", label: "Professional Accounting", desc: "Full-Cycle Practice" },
                { value: 80.24, suffix: "%", decimals: 2, label: "Civil Service Rating", desc: "Career Service Prof." },
                { value: 12, suffix: "+ Yrs", label: "SSS Public Service", desc: "Admin & Claims Lead" },
                { value: 9, suffix: "+ Yrs", label: "Lead Bookkeeper", desc: "TSKI & Cooperatives" },
              ].map((stat, i) => (
                <Reveal key={i} delay={200 + i * 50}>
                  <div className="bento-card rounded-2xl p-5 text-center sm:text-left space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                      <CountUp end={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs font-bold text-white">{stat.label}</div>
                    <div className="text-[11px] text-slate-400">{stat.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE CAREER & PROVENANCE MATRIX */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="provenance">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Career Provenance &amp; Track Record</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  20 Years of Government &amp; Corporate Service
                </h2>
                <p className="text-sm text-slate-400 max-w-2xl mt-1">
                  Click any appointment to inspect responsibilities, verified accomplishments, and supervisors.
                </p>
              </div>

              {/* Segmented Filter */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedCareerCategory("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCareerCategory === "all"
                      ? "bg-amber-400 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All (5)
                </button>
                <button
                  onClick={() => setSelectedCareerCategory("gov")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCareerCategory === "gov"
                      ? "bg-amber-400 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  SSS Government (2)
                </button>
                <button
                  onClick={() => setSelectedCareerCategory("private")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCareerCategory === "private"
                      ? "bg-amber-400 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Bookkeeping &amp; Coops (3)
                </button>
              </div>
            </div>
          </Reveal>

          {/* Interactive Master-Detail Accordion Cards */}
          <div className="space-y-4">
            {filteredCareerRoles.map((role, idx) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <Reveal key={role.id} delay={idx * 50}>
                  <div
                    onClick={() => setExpandedRoleId(isExpanded ? "" : role.id)}
                    className={`bento-card rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ${
                      isExpanded ? "border-amber-400/40 bg-slate-900/90 shadow-2xl" : "hover:border-slate-700"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${role.badgeColor}`}>
                            {role.badge}
                          </span>
                          <span className="text-xs text-slate-400">{role.period}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                          {role.role}
                        </h3>
                        <p className="text-xs text-amber-300/90 font-medium">
                          {role.organization} • <span className="text-slate-400">{role.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          {isExpanded ? "Collapse Details" : "View Breakdown"}
                        </span>
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                          <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${isExpanded ? "rotate-180 text-amber-300" : ""}`}>
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Detail Panel */}
                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 animate-in fade-in duration-300">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {role.summary}
                        </p>

                        <div className="space-y-2">
                          <span className="text-xs font-bold text-white block">Key Responsibilities &amp; Accomplishments:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {role.highlights.map((item, hIdx) => (
                              <div key={hIdx} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                                <span className="text-amber-400 font-bold mt-0.5">✓</span>
                                <span className="leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {role.supervisors && (
                          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                            <span className="material-symbols-outlined text-sm text-amber-400">supervisor_account</span>
                            <span>Direct Supervisor(s): <strong className="text-slate-200">{role.supervisors}</strong></span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {role.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-xl bg-slate-800 text-[11px] text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE DOCUMENT HUB (OFFICIAL DOSSIER) */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="dossier">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Statutory Authenticity</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Official Dossier &amp; Certified PDFs
                </h2>
                <p className="text-sm text-slate-400 max-w-2xl mt-1">
                  Direct access to extracted digital highlights and official signed PDF documents.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedDocCategory("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedDocCategory === "all" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All ({officialDocs.length})
                </button>
                <button
                  onClick={() => setSelectedDocCategory("pds")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedDocCategory === "pds" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  CSC Form 212
                </button>
                <button
                  onClick={() => setSelectedDocCategory("coe")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedDocCategory === "coe" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  COEs (2)
                </button>
                <button
                  onClick={() => setSelectedDocCategory("wes")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedDocCategory === "wes" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Work Sheets (3)
                </button>
              </div>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc, idx) => (
              <Reveal key={doc.id} delay={idx * 75}>
                <div
                  onClick={() => openDocViewer(doc)}
                  className="bento-card rounded-3xl p-6 flex flex-col justify-between h-full cursor-pointer group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">{doc.categoryLabel}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300">
                        {doc.badge}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        <span className="material-symbols-outlined text-xl">{doc.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {doc.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">{doc.issuer}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {doc.summary}
                    </p>

                    <div className="pt-2 space-y-1 border-t border-slate-800">
                      {doc.keyPoints.slice(0, 2).map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <span className="text-amber-400 font-bold">✓</span>
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Inspect Details
                    </span>
                    <span className="text-slate-400 text-[11px]">PDF Attached</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 4: SYSTEMS & STANDARDS STACK */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="stack">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Accounting Systems &amp; Standards</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Software Stack &amp; Statutory Governance
              </h2>
              <p className="text-sm text-slate-400">
                End-to-end proficiency across cloud general ledgers, government portals, spreadsheet modeling, and statutory data security.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "QuickBooks Desktop & Online",
                category: "Accounting & ERP",
                icon: "diamond",
                desc: "Chart of accounts design, multi-bank feed automation, vendor/customer ledgers, and month-end closes.",
              },
              {
                title: "Xero Cloud Accounting",
                category: "Cloud Systems",
                icon: "sync_alt",
                desc: "Cloud reconciliation workflows, automated rule configurations, invoicing, and customized P&L templates.",
              },
              {
                title: "Advanced MS Excel",
                category: "Financial Modeling",
                icon: "table_chart",
                desc: "PivotTables, VLOOKUP/XLOOKUP, multi-year asset depreciation schedules, and 13-week cash projections.",
              },
              {
                title: "SSS Member & Claims Portal",
                category: "Public Sector Portal",
                icon: "account_balance",
                desc: "Claims verification, sickness/maternity/disability screening, member loan processing, and ACOP certifications.",
              },
              {
                title: "PIMS Procurement & Asset Reg.",
                category: "Government Operations",
                icon: "inventory",
                desc: "Official government supplies requisitioning, procurement compliance, and property inventory asset registers.",
              },
              {
                title: "R.A. 10173 Data Privacy Act",
                category: "Statutory Compliance",
                icon: "security",
                desc: "Strict compliance with Philippine Data Privacy standards, safeguarding confidential accounting and identity data.",
              },
            ].map((tool, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="bento-card rounded-3xl p-5 flex flex-col justify-between h-full group space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{tool.category}</span>
                      <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-amber-400 transition-colors">{tool.icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Proficiency: High</span>
                    <span className="text-amber-400 font-semibold">Verified</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 5: CERTIFICATES & ACCREDITATIONS (CAROUSEL / GRID UX) */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="credentials">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Verified Accreditations</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Professional Certifications ({certificateData.length})
                </h2>
                <p className="text-sm text-slate-400 max-w-2xl mt-1">
                  Click any certificate to inspect full high-resolution imagery and download official PDFs.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedCertCategory("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCertCategory === "all" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All ({certificateData.length})
                </button>
                <button
                  onClick={() => setSelectedCertCategory("accounting")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCertCategory === "accounting" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Accounting &amp; ERP (4)
                </button>
                <button
                  onClick={() => setSelectedCertCategory("finance")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCertCategory === "finance" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Finance (3)
                </button>
                <button
                  onClick={() => setSelectedCertCategory("ops")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCertCategory === "ops" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Operations (4)
                </button>
              </div>
            </div>
          </Reveal>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCertificates.map((cert, idx) => (
              <Reveal key={cert.id} delay={idx * 60}>
                <div
                  onClick={() => openCertificateLightbox(idx)}
                  className="bento-card rounded-3xl overflow-hidden flex flex-col justify-between h-full cursor-pointer group"
                >
                  <div>
                    {/* Visual Frame */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950 border-b border-white/10">
                      <img
                        alt={cert.title}
                        src={cert.imageSrc}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-300">
                          {cert.categoryLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          {cert.badge}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
                        <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-lg">
                          Inspect Certificate
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] text-slate-400 block">{cert.issuer}</span>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px]">{cert.idNumber}</span>
                    <span className="text-amber-300 font-bold flex items-center gap-0.5">
                      Enlarge <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SECTION 6: ENGAGEMENT & INTAKE */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Info Card */}
            <Reveal direction="left" className="lg:col-span-5 flex">
              <div className="bento-card w-full rounded-3xl p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Direct Engagement</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Retain Bookkeeping &amp; Advisory Services
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Available for high-stakes bookkeeping mandates, QuickBooks/Xero ledger catch-up, month-end accrual closes, SSS statutory process advisory, and executive virtual administrative support.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                        <span className="material-symbols-outlined text-lg">mail</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-semibold">Government / Official Email</span>
                        <a href="mailto:brionesmb@sss.gov.ph" className="text-white hover:text-amber-300 font-medium transition-colors">
                          brionesmb@sss.gov.ph
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                        <span className="material-symbols-outlined text-lg">call</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-semibold">Official Phone Contact</span>
                        <a href="tel:+639515784797" className="text-white hover:text-amber-300 font-medium transition-colors">
                          +63 951 578 4797
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-semibold">Location</span>
                        <span className="text-white font-medium">Oroquieta City, Misamis Occidental</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                  🔒 <strong>Confidentiality Accord:</strong> All client records and inquiries are strictly governed under the Data Privacy Act of 2012 (R.A. 10173).
                </div>
              </div>
            </Reveal>

            {/* Right Form Card */}
            <Reveal delay={150} direction="scale" className="lg:col-span-7 flex">
              <div className="bento-card w-full rounded-3xl p-7 sm:p-9 shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-white">Direct Consultation Request</h3>
                    <p className="text-xs text-slate-400">Prompt executive response within 24 hours.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold border border-amber-400/30">
                    Active Intake
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="h-14 w-14 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto text-2xl font-bold border border-amber-400/40">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      Thank you. Ma. Faith B. Briones has received your mandate parameters and will follow up promptly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2 rounded-full bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Attorney / Executive Juan Dela Cruz"
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Organization / Enterprise</label>
                        <input
                          type="text"
                          placeholder="e.g. Mindanao Enterprise Corp."
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-300">Contact Number</label>
                        <input
                          type="tel"
                          placeholder="+63 9XX XXX XXXX"
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Mandate Scope</label>
                      <select className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none transition-colors">
                        <option value="bookkeeping">Full-Charge Bookkeeping &amp; General Ledger Catch-up</option>
                        <option value="reconciliation">Bank Reconciliation &amp; Audit Preparation</option>
                        <option value="quickbooks">QuickBooks / Xero Setup &amp; Training</option>
                        <option value="sss">SSS Administrative &amp; Claims Advisory</option>
                        <option value="retainer">Monthly Fiduciary Retainer Mandate</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Message / Requirement Details *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Please describe your accounting, audit reconciliation, or administrative requirements..."
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">send</span>
                      Dispatch Consultation Request
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800 bg-[#060911] py-8 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/profile/avatar.jpg" alt="Ma. Faith B. Briones" className="h-8 w-8 rounded-full object-cover border border-amber-400/40" />
            <span className="text-slate-200 font-semibold">Ma. Faith B. Briones, BSA, CSE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#overview" className="hover:text-amber-300">Overview</a>
            <a href="#provenance" className="hover:text-amber-300">Experience</a>
            <a href="#dossier" className="hover:text-amber-300">Dossier</a>
            <a href="#credentials" className="hover:text-amber-300">Certificates</a>
            <a href="#contact" className="hover:text-amber-300">Contact</a>
          </div>
          <p className="text-[11px] text-slate-500">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>

      {/* FLOATING ACTION & BACK TO TOP */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-amber-400 text-slate-950 shadow-xl hover:scale-110 transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <span className="material-symbols-outlined text-xl">arrow_upward</span>
        </button>
      )}

      {/* MODAL DIALOGS */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => {
            setActiveModal(null);
            setSelectedDoc(null);
          }}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#0F172A] p-6 sm:p-8 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setActiveModal(null);
                setSelectedDoc(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* DOC VIEWER */}
            {activeModal === "doc-viewer" && selectedDoc && (
              <div className="space-y-5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <span className="material-symbols-outlined text-2xl">{selectedDoc.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedDoc.title}</h3>
                    <p className="text-slate-400">{selectedDoc.issuer} • {selectedDoc.dateOrDuration}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-300 block uppercase text-[10px]">Official Summary</span>
                  <p className="text-slate-300 leading-relaxed">{selectedDoc.summary}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-white block uppercase text-[10px]">Key Verified Highlights:</span>
                  <div className="space-y-1.5">
                    {selectedDoc.keyPoints.map((pt, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Signed Official Document</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
                    >
                      Close
                    </button>
                    <a
                      href={selectedDoc.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                      Open Official PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* CERTIFICATE LIGHTBOX WITH PREV/NEXT CAROUSEL CONTROLS */}
            {activeModal === "certificate-lightbox" && currentCert && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pr-8">
                  <div>
                    <h3 className="text-base font-bold text-white">{currentCert.title}</h3>
                    <p className="text-slate-400">{currentCert.issuer} • {currentCert.idNumber}</p>
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold">
                    {selectedCertificateIndex + 1} / {filteredCertificates.length}
                  </span>
                </div>

                {/* High Resolution Image */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center max-h-[480px]">
                  <img
                    alt={currentCert.title}
                    src={currentCert.imageSrc}
                    className="w-full h-auto max-h-[460px] object-contain"
                  />

                  {/* Carousel Left/Right Buttons */}
                  <button
                    onClick={prevCertificate}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/10 transition-colors shadow-lg"
                    aria-label="Previous certificate"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <button
                    onClick={nextCertificate}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/10 transition-colors shadow-lg"
                    aria-label="Next certificate"
                  >
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <p className="text-slate-300 leading-relaxed">{currentCert.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCert.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-amber-300 font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-amber-400 font-semibold">Verified Credential</span>
                  <div className="flex gap-2">
                    {currentCert.pdfPath && (
                      <a
                        href={currentCert.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-slate-800 text-amber-300 border border-amber-400/30 font-bold hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 shadow-md"
                      >
                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                        Open Original PDF
                      </a>
                    )}
                    <a
                      href={currentCert.imageSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      Full Size
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
