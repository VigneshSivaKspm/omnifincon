import LegalPage from "./LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="25 June 2025"
      intro="OMNI Fincon Financial Services Private Limited ('OMNI Fincon', 'we', 'us', 'our') is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and disclose information when you use our website, services, or otherwise interact with us. By accessing our services, you agree to the practices described herein."
      sections={[
        { heading: "Information We Collect",
          body: [
            "Identity Information: Name, date of birth, PAN, Aadhaar (last 4 digits only), passport or driving licence number for KYC purposes.",
            "Contact Information: Email address, phone number, residential and business address.",
            "Financial Information: Income details, bank statements, ITR details, credit reports provided voluntarily during loan or advisory consultations.",
            "Usage Information: IP address, browser type, pages visited, time and date of access, cookies, and similar tracking technologies.",
            "Communication Records: Emails, WhatsApp messages, call recordings (with prior consent), and form submissions.",
          ]
        },
        { heading: "How We Use Your Information",
          body: [
            "To provide financial advisory, loan facilitation, and wealth management services you request.",
            "To verify your identity in compliance with RBI KYC norms and PMLA requirements.",
            "To share your information with our lending partners and financial institutions solely for the purpose of facilitating your loan or investment mandate.",
            "To send service-related communications, appointment reminders, and regulatory notifications.",
            "To improve our website, services, and user experience through anonymous analytics.",
            "To comply with legal obligations, court orders, or regulatory requirements.",
          ]
        },
        { heading: "Data Sharing and Disclosure",
          body: "We do not sell your personal data. We may share your information with: (a) our registered lending partners and financial institutions for mandate facilitation; (b) regulatory bodies such as RBI, SEBI, or IRDAI upon legal requirement; (c) our technology service providers operating under strict data processing agreements; and (d) our legal and compliance advisors under attorney-client privilege. All third parties are contractually bound to maintain data confidentiality."
        },
        { heading: "Data Retention",
          body: "We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy and as required by applicable laws. Financial records are retained for a minimum of 8 years as mandated under the Prevention of Money Laundering Act (PMLA). You may request deletion of non-mandatory data by writing to our Data Protection Officer."
        },
        { heading: "Data Security",
          body: "We implement ISO 27001-aligned security controls including: encryption in transit (TLS 1.3) and at rest (AES-256), role-based access controls, regular security audits, and employee data handling training. No internet transmission is 100% secure; we will notify you in the event of a material data breach as required by applicable law."
        },
        { heading: "Cookies and Tracking",
          body: "Our website uses essential cookies for functionality, analytics cookies (Google Analytics) to understand usage patterns, and marketing cookies only with your explicit consent. You can manage cookie preferences through your browser settings. Disabling essential cookies may impair website functionality."
        },
        { heading: "Your Rights",
          body: [
            "Right of Access: Request a copy of the personal data we hold about you.",
            "Right to Rectification: Request correction of inaccurate or incomplete data.",
            "Right to Erasure: Request deletion of your data where we have no legal obligation to retain it.",
            "Right to Restrict Processing: Request that we limit how we use your data.",
            "Right to Data Portability: Receive your data in a structured, machine-readable format.",
            "Right to Object: Object to processing based on legitimate interests or for direct marketing.",
          ]
        },
        { heading: "Children's Privacy",
          body: "Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected such data, please contact us immediately."
        },
        { heading: "Changes to This Policy",
          body: "We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website with a revised effective date. Continued use of our services after such changes constitutes your acceptance of the updated policy."
        },
        { heading: "Contact Us",
          body: "For privacy-related queries or to exercise your rights, contact our Data Protection Officer at: compliance@omnifincon.com or OMNI Fincon Financial Services Pvt. Ltd., Level 4, Cyber Towers, Hitech City, Hyderabad – 500081, Telangana."
        },
      ]}
    />
  );
}
