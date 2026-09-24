"use client";

import React, { useState, useEffect, useRef } from "react";

type DocCategory = "all" | "pds" | "coe" | "wes";
type CredentialCategory = "all" | "accounting" | "finance" | "ops";
type CareerCategory = "all" | "gov" | "private";
type PipelineStage = "coa" | "vouchers" | "recon" | "close" | "compliance";

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
    summary:
      "Early career accounting foundation following graduation from Andres Bonifacio College: managed daily cash receipts, disbursement journals, and cooperative bookkeeping registers.",
    highlights: [
      "Applied foundational BS Accountancy principles to full-cycle double-entry bookkeeping.",
    ],
    tags: ["Double-Entry Accounting", "Cash Journals", "Voucher Registers"],
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

// Animated Metric Card in Palette Style
function AnimatedMetric({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  label,
  sublabel,
  progress = 100,
  icon = "verified",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  label: string;
  sublabel: string;
  progress?: number;
  icon?: string;
}) {
  const [count, setCount] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - elapsed, 4);
            setCount(easeOutQuart * end);
            setBarWidth(easeOutQuart * progress);

            if (elapsed < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (metricRef.current) observer.observe(metricRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, progress]);

  return (
    <div ref={metricRef} className="clouds-card rounded-3xl p-6 space-y-3 group bg-white shadow-xs border border-[#BDC3C7]/80 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-extrabold text-[#2C3E50] tracking-tight">
          {count.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          <span className="text-[#34495E] ml-0.5">{suffix}</span>
        </span>
        <span className="h-10 w-10 rounded-2xl bg-[#ECF0F1] text-[#2C3E50] flex items-center justify-center border border-[#BDC3C7] shadow-xs group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </span>
      </div>

      <div>
        <div className="text-sm font-bold text-[#2C3E50] group-hover:text-[#34495E] transition-colors">
          {label}
        </div>
        <div className="text-xs text-[#7F8C8D] mt-0.5">{sublabel}</div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 rounded-full bg-[#ECF0F1] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#7F8C8D] shadow-xs transition-all duration-150 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedDocCategory, setSelectedDocCategory] = useState<DocCategory>("all");
  const [selectedCertCategory, setSelectedCertCategory] = useState<CredentialCategory>("all");
  const [selectedCareerCategory, setSelectedCareerCategory] = useState<CareerCategory>("all");
  const [expandedRoleId, setExpandedRoleId] = useState<string>("sss-admin");

  // Interactive Pipeline State
  const [activePipelineStage, setActivePipelineStage] = useState<PipelineStage>("recon");

  // Interactive Estimator State
  const [estimatorOrg, setEstimatorOrg] = useState<string>("corporate");
  const [estimatorModules, setEstimatorModules] = useState<string[]>(["gl", "bank", "statutory"]);
  const [estimatorVolume, setEstimatorVolume] = useState<string>("medium");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number>(0);
  const [selectedDoc, setSelectedDoc] = useState<OfficialDoc | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("Full-Cycle Bookkeeping & General Ledger");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setShowBackToTop(currentScroll > 400);

      const sections = ["overview", "pipeline", "provenance", "dossier", "stack", "credentials", "estimator", "contact"];
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

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✓ Copied ${label} to clipboard!`);
  };

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

  const toggleModule = (id: string) => {
    setEstimatorModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleApplyEstimatorToContact = () => {
    const orgNames: Record<string, string> = {
      corporate: "Private Enterprise / SME",
      cooperative: "Cooperative / Microfinance (CDA)",
      government: "Public Sector / Statutory Agency",
      virtual: "Virtual Business / Remote Accounting",
    };
    const modNames: Record<string, string> = {
      gl: "Full-Cycle GL & COA Architecture",
      bank: "Daily Bank Reconciliation",
      statutory: "SSS / BIR / Statutory HR Compliance",
      cloud: "QuickBooks / Xero Migration",
      audit: "Audit Prep & Financial Statement Package",
    };
    const selectedModList = estimatorModules.map((m) => modNames[m] || m).join(", ");
    
    setFormService("Custom Fractional Engagement Package");
    setFormMessage(
      `Hello Ma. Faith,\n\nI used your interactive engagement calculator for our organization (${orgNames[estimatorOrg]} with ${estimatorVolume} monthly volume).\n\nWe need assistance with:\n- ${selectedModList}\n\nPlease let us know your availability for a discovery discussion.`
    );

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    showToast("✓ Configured scope loaded into Consultation form!");
  };

  const currentCert = filteredCertificates[selectedCertificateIndex] || filteredCertificates[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#ECF0F1] text-[#2C3E50] relative selection:bg-[#34495E] selection:text-white bg-mesh-clouds clouds-grid-pattern">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] px-5 py-3.5 rounded-2xl bg-[#2C3E50] text-[#ECF0F1] font-medium text-xs sm:text-sm shadow-2xl border border-[#34495E] flex items-center gap-3 animate-float-smooth">
          <span className="material-symbols-outlined text-[#BDC3C7] text-base sm:text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Ambient Radiant Soft Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-luminous-radial pointer-events-none z-0"></div>

      {/* Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#BDC3C7]/40 z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#7F8C8D] shadow-xs transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* FLOATING CRYSTAL ISLAND HEADER */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto h-16 rounded-full bg-white/95 backdrop-blur-xl border border-[#BDC3C7]/80 shadow-[0_8px_30px_rgba(44,62,80,0.08)] px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Identity Pill */}
          <a href="#overview" className="flex items-center gap-3 shrink-0 group">
            <div className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border-2 border-[#34495E]/40 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/profile/avatar.jpg"
                alt="Ma. Faith B. Briones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#2C3E50] tracking-tight group-hover:text-[#34495E] transition-colors">
                Ma. Faith B. Briones
              </span>
              <span className="text-[10px] text-[#34495E] font-bold tracking-wide flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34495E] inline-block animate-pulse"></span>
                BSA • CSE 80.24% • Fiduciary Lead
              </span>
            </div>
          </a>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#7F8C8D]">
            {[
              { id: "overview", label: "Overview" },
              { id: "pipeline", label: "Workflow Pipeline" },
              { id: "provenance", label: "Career Matrix" },
              { id: "dossier", label: "Statutory Dossier" },
              { id: "stack", label: "Systems" },
              { id: "credentials", label: "Certifications" },
              { id: "estimator", label: "Scope Calculator" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[#2C3E50] text-white font-bold shadow-xs"
                    : "hover:text-[#2C3E50] hover:bg-[#ECF0F1]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2C3E50] hover:bg-[#34495E] text-[#ECF0F1] text-xs font-bold shadow-md shadow-[#2C3E50]/20 hover:scale-105 transition-all border border-[#34495E]"
            >
              <span>Consult / Retain</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#ECF0F1] text-[#2C3E50] hover:text-[#34495E] border border-[#BDC3C7]"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden max-w-6xl mx-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#BDC3C7] p-4 shadow-xl space-y-1">
            {[
              { id: "overview", label: "Executive Overview" },
              { id: "pipeline", label: "Accounting Workflow Pipeline" },
              { id: "provenance", label: "Career Provenance (20+ Yrs)" },
              { id: "dossier", label: "Statutory Dossier & PDFs" },
              { id: "stack", label: "Systems & Governance" },
              { id: "credentials", label: "Verified Certifications (11 Proofs)" },
              { id: "estimator", label: "Interactive Scope Calculator" },
              { id: "contact", label: "Direct Intake & Consultation" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold text-[#2C3E50] hover:bg-[#ECF0F1] hover:text-[#34495E] transition-colors"
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm text-[#7F8C8D]">chevron_right</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION: PALETTE BENTO GRID */}
      <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Banner Chip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BDC3C7] shadow-xs text-xs font-semibold text-[#2C3E50]">
              <span className="flex h-2 w-2 rounded-full bg-[#34495E] animate-ping"></span>
              <span className="text-[#2C3E50] font-bold">Verified Fiduciary Record</span>
              <span className="text-[#BDC3C7]">•</span>
              <span className="text-[#7F8C8D]">BSA Andres Bonifacio College 2004</span>
              <span className="text-[#BDC3C7]">•</span>
              <span className="text-[#34495E] font-bold">CSE 80.24% Rating</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-sm text-[#34495E]">event_available</span>
              <span>Available for Q3/Q4 2026 Fractional Retainers</span>
            </div>
          </div>

          {/* Hero Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#34495E] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">shield</span>
                    Senior Bookkeeper • Fiduciary Controller • Government Administrator
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2C3E50] tracking-tight leading-[1.12]">
                    Impeccable Ledger <span className="navy-gradient-text">Precision</span> & Statutory Governance.
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-base sm:text-lg text-[#34495E] font-normal leading-relaxed">
                  <strong>Ma. Faith Batilona Briones, BSA, CSE</strong> combines over <strong>20 years</strong> of double-entry General Ledger mastery with <strong>12+ years of Social Security System (SSS)</strong> public administration. Delivering zero-variance bank reconciliations, ISO 9001 microfinance compliance, and boardroom-grade controllership.
                </p>
              </Reveal>

              {/* Action Buttons & Fast Links */}
              <Reveal delay={200}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#pipeline"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2C3E50] hover:bg-[#34495E] text-[#ECF0F1] text-sm font-bold shadow-lg shadow-[#2C3E50]/20 hover:scale-[1.02] transition-all border border-[#34495E]"
                  >
                    <span className="material-symbols-outlined text-lg">timeline</span>
                    <span>Explore Workflow Pipeline</span>
                  </a>

                  <a
                    href="#dossier"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#ECF0F1] text-[#2C3E50] text-sm font-bold border border-[#BDC3C7] shadow-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-lg text-[#34495E]">article</span>
                    <span>Official CSC & COEs</span>
                  </a>

                  <a
                    href="#estimator"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#ECF0F1] text-[#34495E] text-sm font-bold border border-[#BDC3C7] shadow-xs transition-all"
                  >
                    <span className="material-symbols-outlined text-lg text-[#2C3E50]">calculate</span>
                    <span>Scope Calculator</span>
                  </a>
                </div>
              </Reveal>

              {/* Quick Trust Highlights */}
              <Reveal delay={300}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#BDC3C7]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#34495E] text-xl">verified</span>
                    <div>
                      <div className="text-xs font-bold text-[#2C3E50]">100% On-Time</div>
                      <div className="text-[11px] text-[#7F8C8D]">Statutory SSS & Tax</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#2C3E50] text-xl">account_balance</span>
                    <div>
                      <div className="text-xs font-bold text-[#2C3E50]">ISO 9001 Tested</div>
                      <div className="text-[11px] text-[#7F8C8D]">TSKI Microfinance</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                    <span className="material-symbols-outlined text-[#34495E] text-xl">military_tech</span>
                    <div>
                      <div className="text-xs font-bold text-[#2C3E50]">2023 Awardee</div>
                      <div className="text-[11px] text-[#7F8C8D]">Best Customer Service</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Portrait & Visual Bento (5 cols) */}
            <div className="lg:col-span-5">
              <Reveal direction="scale" delay={150}>
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  {/* Outer Frame with Palette Styling */}
                  <div className="relative rounded-3xl p-3 bg-white border border-[#BDC3C7] shadow-[0_20px_50px_rgba(44,62,80,0.1)]">
                    {/* Natural 3:4 Portrait Image Container */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#ECF0F1] shadow-inner">
                      <img
                        src="/profile/profile.jpg"
                        alt="Ma. Faith Batilona Briones, BSA, CSE"
                        className="w-full h-full object-cover object-[center_45%] hover:scale-[1.02] transition-transform duration-500"
                      />

                      {/* Top & Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/90 via-transparent to-transparent pointer-events-none"></div>

                      {/* Floating Trust Pills Inside Image */}
                      <div className="absolute bottom-4 left-4 right-4 text-[#ECF0F1] space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34495E]/90 backdrop-blur-md text-[11px] font-bold border border-[#BDC3C7]/40 shadow-xs">
                          <span className="material-symbols-outlined text-sm">military_tech</span>
                          <span>CSE Professional 80.24% • Verified 2025</span>
                        </div>
                        <div className="text-base font-bold text-white tracking-tight">
                          Ma. Faith Batilona Briones, BSA, CSE
                        </div>
                        <div className="text-xs text-[#BDC3C7]">
                          Bachelor of Science in Accountancy • Andres Bonifacio College
                        </div>
                      </div>
                    </div>

                    {/* Floating Badge (Top-Right) */}
                    <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-2xl bg-white text-[#2C3E50] border border-[#BDC3C7] shadow-lg flex items-center gap-2 animate-float-smooth">
                      <span className="h-2 w-2 rounded-full bg-[#2C3E50]"></span>
                      <span className="text-xs font-bold">20+ Yrs Practice</span>
                    </div>

                    {/* Floating Badge (Bottom-Left) */}
                    <div className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-2xl bg-white text-[#2C3E50] border border-[#BDC3C7] shadow-lg flex items-center gap-2 animate-float-smooth" style={{ animationDelay: "2s" }}>
                      <span className="material-symbols-outlined text-[#34495E] text-sm">verified_user</span>
                      <span className="text-xs font-bold">12+ Yrs Public Service</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 4 INTERACTIVE ANIMATED METRICS COUNTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <AnimatedMetric
              end={20}
              suffix="+"
              label="Years Experience"
              sublabel="Fiduciary & Public Accounting"
              progress={100}
              icon="calendar_month"
            />
            <AnimatedMetric
              end={80.24}
              decimals={2}
              suffix="%"
              label="CSE Professional Rating"
              sublabel="Civil Service Commission Conferred"
              progress={90}
              icon="military_tech"
            />
            <AnimatedMetric
              end={12}
              suffix="+ Yrs"
              label="SSS Public Administration"
              sublabel="Disbursements & Claims Leadership"
              progress={85}
              icon="admin_panel_settings"
            />
            <AnimatedMetric
              end={9}
              suffix="+ Yrs"
              label="Lead Bookkeeper"
              sublabel="TSKI & Cooperative General Ledgers"
              progress={80}
              icon="account_balance_wallet"
            />
          </div>
        </div>
      </section>

      {/* INTERACTIVE ACCOUNTING WORKFLOW & RECONCILIATION PIPELINE */}
      <section id="pipeline" className="py-20 px-4 sm:px-6 bg-white/70 border-y border-[#BDC3C7]/80 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">hub</span>
                <span>Interactive Delivery Pipeline</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                How Engagements Deliver <span className="navy-gradient-text">Zero-Variance</span> Control.
              </h2>
              <p className="text-sm sm:text-base text-[#7F8C8D]">
                Click through each phase below to inspect the actual controllership protocols, deliverables, and statutory safeguards implemented for every client.
              </p>
            </div>
          </Reveal>

          {/* Pipeline Interactive Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "coa" as PipelineStage, step: "01", label: "COA & Architecture", icon: "account_tree" },
              { id: "vouchers" as PipelineStage, step: "02", label: "Disbursement Control", icon: "receipt_long" },
              { id: "recon" as PipelineStage, step: "03", label: "Daily Bank Recon", icon: "sync_alt" },
              { id: "close" as PipelineStage, step: "04", label: "Month-End P&L Close", icon: "query_stats" },
              { id: "compliance" as PipelineStage, step: "05", label: "Statutory & Audit Defense", icon: "verified" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePipelineStage(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activePipelineStage === p.id
                    ? "bg-[#2C3E50] text-[#ECF0F1] shadow-lg shadow-[#2C3E50]/20 scale-105 border border-[#34495E]"
                    : "bg-white text-[#34495E] border border-[#BDC3C7] hover:bg-[#ECF0F1]"
                }`}
              >
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                  activePipelineStage === p.id ? "bg-white/20 text-white" : "bg-[#ECF0F1] text-[#7F8C8D]"
                }`}>
                  {p.step}
                </span>
                <span className="material-symbols-outlined text-base">{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Pipeline Content Display */}
          <Reveal key={activePipelineStage} direction="scale">
            <div className="clouds-card rounded-3xl p-6 sm:p-8 bg-white border border-[#BDC3C7] shadow-lg">
              {activePipelineStage === "coa" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                      <span>Phase 01: Systems & Account Architecture</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50]">
                      Standardized Chart of Accounts (COA) & ERP Setup
                    </h3>
                    <p className="text-[#34495E] text-sm leading-relaxed">
                      Custom structural alignment with GAAP and CDA standards. Eliminates duplicate ledgers, sets up departmental cost centers, and maps accounting rules into QuickBooks or Xero.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">check_circle</span>
                          Key Deliverable
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Multi-tier COA Taxonomy & Class Mapping Matrix</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">speed</span>
                          Turnaround
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">1–3 Days Initial Onboarding Deployment</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#ECF0F1] border border-[#BDC3C7] space-y-3">
                    <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide">Fiduciary Safeguard</div>
                    <ul className="space-y-2 text-xs text-[#34495E]">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Zero inter-company ledger mismatches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Standardized naming conventions for multi-currency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Automated bank feed synchronization rules</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activePipelineStage === "vouchers" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                      <span>Phase 02: Transaction & Voucher Hygiene</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50]">
                      Disbursement Vouchers, Receipts & PIMS Procurement
                    </h3>
                    <p className="text-[#34495E] text-sm leading-relaxed">
                      Leveraging 12+ years of SSS disbursement voucher preparation and TSKI microfinance cash registers. Every expense has complete statutory invoice attachments and dual-authorization checks.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">check_circle</span>
                          Key Deliverable
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Audit-Ready Voucher Registry & Invoice Digital Archive</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">speed</span>
                          Turnaround
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Daily / 24-Hour Processing Cycle</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#ECF0F1] border border-[#BDC3C7] space-y-3">
                    <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide">Fiduciary Safeguard</div>
                    <ul className="space-y-2 text-xs text-[#34495E]">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Zero unauthorized disbursements or orphan receipts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>PIMS and procurement asset tag tracing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Complete tax withholding documentation (BIR Form 2307)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activePipelineStage === "recon" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                      <span>Phase 03: Cash & Bank Reconciliation</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50]">
                      Daily Bank Feeds, Merchant Accounts & Loan Portfolios
                    </h3>
                    <p className="text-[#34495E] text-sm leading-relaxed">
                      Continuous bank-to-ledger matching for multi-bank accounts, Stripe/PayPal feeds, and microfinance loan amortizations. Outstanding checks and deposits in transit are resolved immediately.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">check_circle</span>
                          Key Deliverable
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Multi-Bank Reconciliation Schedules & Variance Log</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">speed</span>
                          Turnaround
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Daily / Weekly Real-Time Balance Match</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#ECF0F1] border border-[#BDC3C7] space-y-3">
                    <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide">Fiduciary Safeguard</div>
                    <ul className="space-y-2 text-xs text-[#34495E]">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>0% undetected bank fee or payment discrepancies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Immediate identification of bounced or dishonored checks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Automated reconciliation rules for 90%+ daily speed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activePipelineStage === "close" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                      <span>Phase 04: Month-End Close & Financial Reporting</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50]">
                      Trial Balance, Accruals, P&L & Balance Sheet Package
                    </h3>
                    <p className="text-[#34495E] text-sm leading-relaxed">
                      Rigorous month-end close including prepaid expense amortization, fixed asset depreciation schedules, and variance analysis against monthly operational budgets.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">check_circle</span>
                          Key Deliverable
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Executive Monthly Financial Pack (P&L, BS, Cash Flow)</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">speed</span>
                          Turnaround
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">T+3 to T+5 Days Post-Month Close</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#ECF0F1] border border-[#BDC3C7] space-y-3">
                    <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide">Fiduciary Safeguard</div>
                    <ul className="space-y-2 text-xs text-[#34495E]">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>100% Trial Balance mathematical tie-out</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Accrual schedules matching GAAP revenue recognition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Clear executive narrative highlighting cost anomalies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activePipelineStage === "compliance" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                      <span>Phase 05: Statutory Compliance & Audit Defense</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50]">
                      SSS Remittances, CDA Cooperative Filings & Audit Readiness
                    </h3>
                    <p className="text-[#34495E] text-sm leading-relaxed">
                      Direct integration with statutory portals (SSS, PhilHealth, Pag-IBIG, CDA). Prepares comprehensive audit workpapers and supporting schedules so external audits conclude with zero adjustments.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">check_circle</span>
                          Key Deliverable
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">Audit Workpapers, Statutory Remittance Reports & Schedules</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7]">
                        <div className="text-xs font-bold text-[#2C3E50] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#34495E] text-base">speed</span>
                          Turnaround
                        </div>
                        <div className="text-xs text-[#34495E] mt-1">100% On-Time Before Statutory Deadlines</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#ECF0F1] border border-[#BDC3C7] space-y-3">
                    <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide">Fiduciary Safeguard</div>
                    <ul className="space-y-2 text-xs text-[#34495E]">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Zero penalty guarantee for statutory deadlines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Full compliance with Republic Act 10173 (Data Privacy)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">task_alt</span>
                        <span>Official signing by verified BSA & CSE Professional</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 20-YEAR CAREER PROVENANCE MATRIX */}
      <section id="provenance" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">history_edu</span>
                  <span>Verified 20-Year Employment History</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                  Career Provenance & Public Record
                </h2>
                <p className="text-sm text-[#7F8C8D] mt-1">
                  Cross-referenced with CSC Form 212 and official Certificates of Employment.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#BDC3C7] shadow-xs">
                {[
                  { id: "all" as CareerCategory, label: "All Engagements (5)" },
                  { id: "gov" as CareerCategory, label: "SSS Public Service" },
                  { id: "private" as CareerCategory, label: "Bookkeeping & Coops" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCareerCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCareerCategory === tab.id
                        ? "bg-[#2C3E50] text-white shadow-xs"
                        : "text-[#7F8C8D] hover:text-[#2C3E50] hover:bg-[#ECF0F1]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Interactive Career Accordions */}
          <div className="space-y-4">
            {filteredCareerRoles.map((role, idx) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <Reveal key={role.id} delay={idx * 60}>
                  <div
                    className={`rounded-3xl border transition-all duration-300 bg-white ${
                      isExpanded
                        ? "border-[#34495E] shadow-md ring-2 ring-[#34495E]/10"
                        : "border-[#BDC3C7] hover:border-[#7F8C8D] shadow-xs"
                    }`}
                  >
                    {/* Header Row (Clickable) */}
                    <button
                      onClick={() => setExpandedRoleId(isExpanded ? "" : role.id)}
                      className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border bg-[#ECF0F1] text-[#2C3E50] border-[#BDC3C7]"
                          >
                            {role.badge}
                          </span>
                          <span className="text-xs text-[#7F8C8D] font-semibold">{role.period}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#2C3E50]">{role.role}</h3>
                        <div className="text-xs text-[#34495E] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span>
                            {role.organization} • {role.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-bold text-[#7F8C8D] hidden sm:inline">
                          {isExpanded ? "Collapse Record" : "View Breakdown"}
                        </span>
                        <div
                          className={`h-9 w-9 rounded-2xl flex items-center justify-center border transition-all ${
                            isExpanded
                              ? "bg-[#2C3E50] text-white border-[#2C3E50] rotate-180"
                              : "bg-[#ECF0F1] text-[#2C3E50] border-[#BDC3C7]"
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                      </div>
                    </button>

                    {/* Expandable Body */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-[#ECF0F1] space-y-4 text-sm text-[#34495E] animate-fadeIn">
                        <p className="leading-relaxed bg-[#ECF0F1]/60 p-4 rounded-2xl border border-[#BDC3C7] text-[#2C3E50]">
                          {role.summary}
                        </p>

                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-[#2C3E50] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#34495E] text-sm">task_alt</span>
                            <span>Key Duties & Verified Contributions</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {role.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 p-2.5 rounded-xl bg-[#ECF0F1]/40 border border-[#BDC3C7]"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2C3E50] mt-1.5 shrink-0"></span>
                                <span className="text-[#34495E]">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Supervisory Verification & Tags */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#BDC3C7]">
                          {role.supervisors && (
                            <div className="text-xs text-[#7F8C8D]">
                              <span className="font-bold text-[#2C3E50]">Official Supervisors:</span>{" "}
                              {role.supervisors}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                            {role.tags.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-[#ECF0F1] text-[#2C3E50] font-semibold text-[11px] border border-[#BDC3C7]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFICIAL STATUTORY DOSSIER & PDF HUB */}
      <section id="dossier" className="py-20 px-4 sm:px-6 bg-white/80 border-y border-[#BDC3C7]/80 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">folder_shared</span>
                  <span>Direct Primary Records</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                  Official Statutory Dossier & Signed PDFs
                </h2>
                <p className="text-sm text-[#7F8C8D] mt-1">
                  Inspect or download all 6 official signed records including CS Form 212, COEs, and Work Experience Sheets.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#BDC3C7] shadow-xs">
                {[
                  { id: "all" as DocCategory, label: "All Dossiers (6)" },
                  { id: "pds" as DocCategory, label: "CSC Form 212" },
                  { id: "coe" as DocCategory, label: "COE Certs" },
                  { id: "wes" as DocCategory, label: "Work Experience" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDocCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedDocCategory === tab.id
                        ? "bg-[#2C3E50] text-white shadow-xs"
                        : "text-[#7F8C8D] hover:text-[#2C3E50] hover:bg-[#ECF0F1]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc, idx) => (
              <Reveal key={doc.id} delay={idx * 60}>
                <div className="clouds-card rounded-3xl p-6 bg-white border border-[#BDC3C7] shadow-xs flex flex-col justify-between space-y-5 h-full group hover:border-[#2C3E50]">
                  <div className="space-y-3.5">
                    {/* Card Top Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="h-11 w-11 rounded-2xl flex items-center justify-center border bg-[#ECF0F1] text-[#2C3E50] border-[#BDC3C7]"
                      >
                        <span className="material-symbols-outlined text-xl">{doc.icon}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-[11px] font-extrabold border border-[#BDC3C7]">
                        {doc.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#7F8C8D]">
                        {doc.categoryLabel}
                      </div>
                      <h3 className="text-base font-bold text-[#2C3E50] group-hover:text-[#34495E] transition-colors mt-0.5">
                        {doc.title}
                      </h3>
                      <div className="text-xs text-[#34495E] font-semibold mt-1">{doc.issuer}</div>
                      <div className="text-[11px] text-[#7F8C8D] font-medium">{doc.dateOrDuration}</div>
                    </div>

                    <p className="text-xs text-[#34495E] line-clamp-3 leading-relaxed">
                      {doc.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#ECF0F1] flex items-center gap-2">
                    <button
                      onClick={() => openDocViewer(doc)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#ECF0F1] hover:bg-[#34495E] text-[#2C3E50] hover:text-white text-xs font-bold border border-[#BDC3C7] flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>Inspect Dossier</span>
                    </button>

                    <a
                      href={doc.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white hover:bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] flex items-center justify-center transition-colors"
                      title="Open Signed PDF in New Tab"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS & GOVERNANCE STACK */}
      <section id="stack" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span>Software & Statutory Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                Systems & Compliance Ecosystem
              </h2>
              <p className="text-sm text-[#7F8C8D]">
                End-to-end fluency across cloud ERPs, government statutory portals, and financial modeling tools.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "QuickBooks Online & Desktop",
                badge: "Certified ERP",
                category: "Accounting Systems",
                icon: "diamond",
                desc: "Full-cycle general ledger management, chart of accounts standardization, automated bank feed reconciliation, and vendor/customer accounts setup.",
                metrics: "100% Reconciliation Accuracy",
              },
              {
                title: "Xero Cloud Accounting",
                badge: "Certified Specialist",
                category: "Cloud Controllership",
                icon: "sync_alt",
                desc: "Multi-currency bank feed automations, dynamic custom invoice workflows, real-time management dashboards, and audit-ready report generation.",
                metrics: "Real-Time Cloud Feeds",
              },
              {
                title: "Excel Financial Modeling & Analysis",
                badge: "Master Tier",
                category: "Spreadsheet Architecture",
                icon: "table_chart",
                desc: "Advanced nested financial models, 13-week rolling cash flow forecasts, debt amortization schedules, and trial balance validation bridges.",
                metrics: "Zero Formula Errors",
              },
              {
                title: "SSS Systems & Member Portal",
                badge: "12+ Yrs Public Sector",
                category: "Statutory Portals",
                icon: "account_balance",
                desc: "Expert processing of SSS sickness, maternity, retirement, and disability benefit claims, member loan applications, and annual confirmation of pensioners.",
                metrics: "2023 Division Service Winner",
              },
              {
                title: "PIMS Procurement & Asset Registry",
                badge: "Institutional Record",
                category: "Government Procurement",
                icon: "inventory_2",
                desc: "Property and Inventory Management System (PIMS) operations, government purchase requisitions, physical inventory tracking, and disbursement voucher compliance.",
                metrics: "Zero COA Audit Findings",
              },
              {
                title: "R.A. 10173 Data Privacy & QMS",
                badge: "Statutory Law",
                category: "Fiduciary Governance",
                icon: "lock",
                desc: "Strict adherence to the Philippine Data Privacy Act of 2012, protecting confidential member/client financial records under ISO 9001 Quality Management Systems.",
                metrics: "100% Data Confidentiality",
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="clouds-card rounded-3xl p-6 bg-white border border-[#BDC3C7] shadow-xs space-y-4 hover:border-[#2C3E50]">
                  <div className="flex items-center justify-between">
                    <span
                      className="h-11 w-11 rounded-2xl flex items-center justify-center border bg-[#ECF0F1] text-[#2C3E50] border-[#BDC3C7]"
                    >
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-[11px] font-bold border border-[#BDC3C7]">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-wide text-[#34495E]">
                      {item.category}
                    </div>
                    <h3 className="text-base font-bold text-[#2C3E50] mt-0.5">{item.title}</h3>
                  </div>

                  <p className="text-xs text-[#34495E] leading-relaxed">{item.desc}</p>

                  <div className="pt-3 border-t border-[#ECF0F1] flex items-center justify-between text-xs">
                    <span className="text-[#7F8C8D] font-medium">Standard:</span>
                    <span className="font-bold text-[#2C3E50] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#34495E]"></span>
                      {item.metrics}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED CERTIFICATIONS GALLERY (ALL 11 PROOFS WITH LIGHTBOX) */}
      <section id="credentials" className="py-20 px-4 sm:px-6 bg-white/80 border-y border-[#BDC3C7]/80 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  <span>11 Conferred Certifications</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                  Verified Conferred Credentials
                </h2>
                <p className="text-sm text-[#7F8C8D] mt-1">
                  Click any certificate for high-resolution inspection, verified skills, and official certificate IDs.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#BDC3C7] shadow-xs">
                {[
                  { id: "all" as CredentialCategory, label: "All 11 Proofs" },
                  { id: "accounting" as CredentialCategory, label: "Accounting & ERP (4)" },
                  { id: "finance" as CredentialCategory, label: "Finance & Debt (3)" },
                  { id: "ops" as CredentialCategory, label: "Gov & Operations (4)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCertCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCertCategory === tab.id
                        ? "bg-[#2C3E50] text-white shadow-xs"
                        : "text-[#7F8C8D] hover:text-[#2C3E50] hover:bg-[#ECF0F1]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, idx) => (
              <Reveal key={cert.id} delay={idx * 50}>
                <div
                  onClick={() => openCertificateLightbox(idx)}
                  className="clouds-card rounded-3xl p-4 sm:p-5 bg-white border border-[#BDC3C7] shadow-xs cursor-pointer group flex flex-col justify-between space-y-4 hover:border-[#2C3E50] hover:shadow-xl transition-all"
                >
                  {/* Visual Preview Container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECF0F1] border border-[#BDC3C7] shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={cert.imageSrc}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 text-[#2C3E50] text-xs font-bold shadow-md">
                        <span className="material-symbols-outlined text-sm text-[#34495E]">zoom_in</span>
                        <span>Click to Inspect High-Res</span>
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#2C3E50] bg-[#ECF0F1] px-2 py-0.5 rounded-md border border-[#BDC3C7]">
                        {cert.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-[#7F8C8D] font-bold">
                        {cert.idNumber}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#2C3E50] group-hover:text-[#34495E] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="text-xs text-[#7F8C8D] line-clamp-1">{cert.issuer}</div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#ECF0F1] text-[#34495E] text-[10px] font-semibold border border-[#BDC3C7]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SCOPE & RETAINER ESTIMATOR */}
      <section id="estimator" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto space-y-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">calculate</span>
                <span>Interactive Client Tool</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                Interactive Scope & Retainer Calculator
              </h2>
              <p className="text-sm sm:text-base text-[#7F8C8D]">
                Select your organization model and required accounting modules to calculate recommended delivery cadences and prefill a consultation request.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step 1: Configuration Form (7 cols) */}
            <div className="lg:col-span-7 clouds-card rounded-3xl p-6 sm:p-8 bg-white border border-[#BDC3C7] shadow-md space-y-6">
              {/* Org Type Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#34495E] text-base">domain</span>
                  <span>1. Select Organization Structure</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "corporate", label: "Private Enterprise / SME", icon: "business" },
                    { id: "cooperative", label: "Cooperative / Microfinance", icon: "groups" },
                    { id: "government", label: "Public Sector Agency", icon: "account_balance" },
                    { id: "virtual", label: "Virtual / Remote Company", icon: "laptop_chromebook" },
                  ].map((org) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => setEstimatorOrg(org.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold border transition-all text-left ${
                        estimatorOrg === org.id
                          ? "bg-[#2C3E50] text-white border-[#2C3E50] shadow-xs"
                          : "bg-[#ECF0F1]/60 text-[#34495E] border-[#BDC3C7] hover:bg-[#ECF0F1]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{org.icon}</span>
                      <span>{org.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#34495E] text-base">check_box</span>
                  <span>2. Select Required Controllership Modules</span>
                </label>
                <div className="space-y-2">
                  {[
                    { id: "gl", label: "Full-Cycle General Ledger & COA Hygiene", desc: "Double-entry journal entries, trial balance, and depreciation schedules." },
                    { id: "bank", label: "Daily Bank Feeds & Multi-Account Reconciliation", desc: "Automated statement matching, merchant clearing, zero variance." },
                    { id: "statutory", label: "SSS / BIR / Statutory HR Compliance", desc: "Monthly statutory contributions, employee benefits claims, Form 2307s." },
                    { id: "cloud", label: "QuickBooks & Xero Cloud Migration", desc: "Software onboarding, historical data clean-up, automated feed setup." },
                    { id: "audit", label: "Audit Preparation & Financial Statement Pack", desc: "Balance sheet schedules, P&L bridges, external auditor defense." },
                  ].map((m) => {
                    const isChecked = estimatorModules.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleModule(m.id)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                          isChecked
                            ? "bg-[#ECF0F1] border-[#2C3E50] shadow-xs"
                            : "bg-white border-[#BDC3C7] hover:bg-[#ECF0F1]/50"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                            isChecked ? "bg-[#2C3E50] text-white" : "border border-[#BDC3C7] bg-white"
                          }`}
                        >
                          {isChecked && <span className="material-symbols-outlined text-xs">check</span>}
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isChecked ? "text-[#2C3E50]" : "text-[#34495E]"}`}>
                            {m.label}
                          </div>
                          <div className="text-[11px] text-[#7F8C8D] mt-0.5">{m.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volume Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#2C3E50] uppercase tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#34495E] text-base">swap_calls</span>
                  <span>3. Monthly Transaction Volume</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "low", label: "Standard (< 300 txns)" },
                    { id: "medium", label: "Growth (300-1K txns)" },
                    { id: "high", label: "Enterprise (1K+ txns)" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setEstimatorVolume(v.id)}
                      className={`p-2.5 rounded-2xl text-xs font-bold border transition-all text-center ${
                        estimatorVolume === v.id
                          ? "bg-[#2C3E50] text-white border-[#2C3E50] shadow-xs"
                          : "bg-[#ECF0F1]/60 text-[#34495E] border-[#BDC3C7] hover:bg-[#ECF0F1]"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Dynamic Summary Card (5 cols) */}
            <div className="lg:col-span-5 clouds-card rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#2C3E50] to-[#34495E] text-[#ECF0F1] border border-[#34495E] shadow-xl space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#BDC3C7] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">receipt</span>
                  <span>Custom Retainer Blueprint</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Recommended Delivery Cadence</h3>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#BDC3C7]">Target Response Cadence:</span>
                  <span className="text-xs font-bold text-white">
                    {estimatorVolume === "high" ? "Daily Dedicated Check-ins" : "Weekly Close + Month-End"}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#BDC3C7]">Modules Selected:</span>
                  <span className="text-xs font-bold text-white">{estimatorModules.length} Active Modules</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#BDC3C7]">Fiduciary Lead:</span>
                  <span className="text-xs font-bold text-white">Ma. Faith Briones, BSA, CSE</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#BDC3C7]">
                <div className="font-bold text-white">Included Standard Guarantees:</div>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#BDC3C7] text-sm">check_circle</span>
                    <span>100% Zero-Variance Bank Tie-Out</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#BDC3C7] text-sm">check_circle</span>
                    <span>On-Time Statutory SSS / BIR Compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#BDC3C7] text-sm">check_circle</span>
                    <span>Direct Communication & Executive Narrative</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleApplyEstimatorToContact}
                className="w-full py-3.5 rounded-2xl bg-[#ECF0F1] hover:bg-white text-[#2C3E50] text-sm font-extrabold shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                <span>Load Scope into Consultation Form</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT INTAKE & CONTACT SUITE */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-white/70 border-t border-[#BDC3C7]/80 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>Fiduciary Advisory & Controllership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                Initiate Fiduciary Consultation
              </h2>
              <p className="text-sm text-[#7F8C8D]">
                Engage for fractional controllership, general ledger hygiene, cooperative bookkeeping, or government administrative consultation.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details & Direct Connect (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="clouds-card rounded-3xl p-6 bg-white border border-[#BDC3C7] shadow-xs space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]">
                  Official Communication Channels
                </div>

                <div className="space-y-3">
                  {/* Email Box */}
                  <div className="p-4 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-[#2C3E50] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-lg">mail</span>
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-[#7F8C8D]">Direct Email</div>
                        <a
                          href="mailto:faithbriones22@gmail.com"
                          className="text-xs sm:text-sm font-bold text-[#2C3E50] hover:text-[#34495E] transition-colors"
                        >
                          faithbriones22@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard("faithbriones22@gmail.com", "Email")}
                      className="p-2 rounded-xl bg-white hover:bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold"
                      title="Copy Email"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>

                  {/* Phone Box */}
                  <div className="p-4 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-[#34495E] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-lg">call</span>
                      </span>
                      <div>
                        <div className="text-[10px] font-bold uppercase text-[#7F8C8D]">Direct Mobile</div>
                        <a
                          href="tel:+639482454704"
                          className="text-xs sm:text-sm font-bold text-[#2C3E50] hover:text-[#34495E] transition-colors"
                        >
                          +63 948 245 4704
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard("+63 948 245 4704", "Mobile Number")}
                      className="p-2 rounded-xl bg-white hover:bg-[#ECF0F1] text-[#2C3E50] border border-[#BDC3C7] text-xs font-bold"
                      title="Copy Mobile"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>

                  {/* Location Box */}
                  <div className="p-4 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7] flex items-center gap-3">
                    <span className="h-10 w-10 rounded-xl bg-[#7F8C8D] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                    </span>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#7F8C8D]">Jurisdiction & Location</div>
                      <div className="text-xs sm:text-sm font-bold text-[#2C3E50]">
                        Oroquieta City, Misamis Occidental, Philippines
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Status Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#BDC3C7] uppercase tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-[#BDC3C7] animate-ping"></span>
                  <span>Direct Availability Notice</span>
                </div>
                <div className="text-base font-bold text-white">
                  Fractional & Full Retainer Engagements
                </div>
                <p className="text-xs text-[#ECF0F1] leading-relaxed">
                  Available for remote cloud controllership, on-site consultation for Northern Mindanao cooperatives, and statutory government advisory.
                </p>
              </div>
            </div>

            {/* Interactive Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="clouds-card rounded-3xl p-6 sm:p-8 bg-white border border-[#BDC3C7] shadow-md">
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-4 animate-fadeIn">
                    <div className="h-16 w-16 rounded-full bg-[#ECF0F1] text-[#2C3E50] mx-auto flex items-center justify-center border border-[#BDC3C7]">
                      <span className="material-symbols-outlined text-3xl">check_circle</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-[#2C3E50]">Inquiry Transmitted</h3>
                      <p className="text-sm text-[#34495E] max-w-md mx-auto">
                        Thank you. Your consultation request has been forwarded directly to <strong>Ma. Faith B. Briones</strong>. You will receive a response within 24 business hours.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormMessage("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#2C3E50] text-xs font-bold"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="text-base font-bold text-[#2C3E50]">
                      Submit Confidential Consultation Request
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#2C3E50]">Full Name / Organization *</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Attorney Juan Dela Cruz / Apex Corp"
                          className="w-full px-4 py-2.5 rounded-2xl bg-[#ECF0F1]/50 border border-[#BDC3C7] text-xs sm:text-sm text-[#2C3E50] focus:bg-white focus:outline-none focus:border-[#2C3E50] transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#2C3E50]">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. client@enterprise.com"
                          className="w-full px-4 py-2.5 rounded-2xl bg-[#ECF0F1]/50 border border-[#BDC3C7] text-xs sm:text-sm text-[#2C3E50] focus:bg-white focus:outline-none focus:border-[#2C3E50] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2C3E50]">Primary Engagement Scope *</label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#ECF0F1]/50 border border-[#BDC3C7] text-xs sm:text-sm text-[#2C3E50] focus:bg-white focus:outline-none focus:border-[#2C3E50] transition-all"
                      >
                        <option>Full-Cycle Bookkeeping & General Ledger</option>
                        <option>Bank Reconciliation & Daily Cash Book Hygiene</option>
                        <option>Cooperative / Microfinance Accounting & CDA Standards</option>
                        <option>SSS / PhilHealth / Pag-IBIG Statutory HR & Claims</option>
                        <option>QuickBooks / Xero Cloud Systems Migration</option>
                        <option>Custom Fractional Engagement Package</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#2C3E50]">Project Specifics & Timeline *</label>
                      <textarea
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Please describe your current accounting setup, software used, transaction volume, or statutory assistance required..."
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#ECF0F1]/50 border border-[#BDC3C7] text-xs sm:text-sm text-[#2C3E50] focus:bg-white focus:outline-none focus:border-[#2C3E50] transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-[#2C3E50] hover:bg-[#34495E] text-[#ECF0F1] text-sm font-bold shadow-lg shadow-[#2C3E50]/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all border border-[#34495E]"
                    >
                      <span className="material-symbols-outlined text-lg">send</span>
                      <span>Transmit Consultation Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 sm:px-6 bg-[#2C3E50] text-[#ECF0F1] border-t border-[#34495E]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-[#BDC3C7]">
              <img
                src="/profile/avatar.jpg"
                alt="Ma. Faith B. Briones"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Ma. Faith Batilona Briones, BSA, CSE</div>
              <div className="text-xs text-[#BDC3C7]">
                Bachelor of Science in Accountancy • Career Service Professional 80.24%
              </div>
            </div>
          </div>

          <div className="text-xs text-[#BDC3C7] text-center md:text-right space-y-1">
            <div>Official Executive Portfolio • Republic of the Philippines</div>
            <div className="text-[#7F8C8D]">
              Cross-Referenced with CS Form 212 & Statutory Employment Records
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-white text-[#2C3E50] shadow-xl border border-[#BDC3C7] hover:bg-[#ECF0F1] hover:scale-110 transition-all"
          aria-label="Back to top"
        >
          <span className="material-symbols-outlined text-xl text-[#2C3E50]">arrow_upward</span>
        </button>
      )}

      {/* MODAL 1: STATUTORY DOSSIER INSPECTOR */}
      {activeModal === "doc-viewer" && selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2C3E50]/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#BDC3C7] shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                  {selectedDoc.badge}
                </span>
                <h3 className="text-xl font-bold text-[#2C3E50] mt-2">{selectedDoc.title}</h3>
                <div className="text-xs text-[#34495E] font-semibold">{selectedDoc.issuer}</div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#2C3E50]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#ECF0F1]/60 border border-[#BDC3C7] text-xs sm:text-sm text-[#2C3E50] leading-relaxed">
              {selectedDoc.summary}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]">
                Verified Statutory Points:
              </div>
              <ul className="space-y-1.5 text-xs text-[#34495E]">
                {selectedDoc.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#2C3E50] text-sm shrink-0">check_circle</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedDoc.supervisors && (
              <div className="text-xs text-[#7F8C8D] pt-2 border-t border-[#BDC3C7]">
                <span className="font-bold text-[#2C3E50]">Official Signatory:</span> {selectedDoc.supervisors}
              </div>
            )}

            <div className="pt-4 border-t border-[#BDC3C7] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2.5 rounded-xl bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#2C3E50] text-xs font-bold"
              >
                Close
              </button>

              <a
                href={selectedDoc.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#2C3E50] hover:bg-[#34495E] text-white text-xs font-bold flex items-center gap-1.5 shadow-md border border-[#34495E]"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Open Official PDF Document</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CERTIFICATE LIGHTBOX CAROUSEL */}
      {activeModal === "certificate-lightbox" && currentCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2C3E50]/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white border border-[#BDC3C7] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[95vh] overflow-y-auto">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50] text-xs font-bold border border-[#BDC3C7]">
                    {currentCert.categoryLabel}
                  </span>
                  <span className="text-xs text-[#7F8C8D] font-mono font-bold">
                    {selectedCertificateIndex + 1} of {filteredCertificates.length}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mt-1">{currentCert.title}</h3>
                <div className="text-xs text-[#7F8C8D]">{currentCert.issuer}</div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#2C3E50]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* High-Resolution Certificate Image Preview */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#2C3E50] border border-[#BDC3C7] flex items-center justify-center group shadow-inner">
              <img
                src={currentCert.imageSrc}
                alt={currentCert.title}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev / Next Controls */}
              {filteredCertificates.length > 1 && (
                <>
                  <button
                    onClick={prevCertificate}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 hover:bg-white text-[#2C3E50] shadow-lg transition-transform hover:scale-110 border border-[#BDC3C7]"
                    aria-label="Previous Certificate"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button
                    onClick={nextCertificate}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 hover:bg-white text-[#2C3E50] shadow-lg transition-transform hover:scale-110 border border-[#BDC3C7]"
                    aria-label="Next Certificate"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </>
              )}
            </div>

            {/* Verification & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#2C3E50]">Certificate Curriculum Scope:</div>
                <p className="text-xs text-[#34495E] leading-relaxed">{currentCert.description}</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#2C3E50]">Verified Competency Tags:</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#ECF0F1] text-[#2C3E50] text-xs font-semibold border border-[#BDC3C7]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#BDC3C7] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#7F8C8D]">
                Official Identifier: {currentCert.idNumber}
              </span>

              <div className="flex items-center gap-2">
                {currentCert.pdfPath && (
                  <a
                    href={currentCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#2C3E50] hover:bg-[#34495E] text-white text-xs font-bold flex items-center gap-1 border border-[#34495E]"
                  >
                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    <span>Open Conferred PDF</span>
                  </a>
                )}

                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#2C3E50] text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
