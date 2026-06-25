import LegalPage from "./LegalPage";

export default function GrievanceRedressal() {
  return (
    <LegalPage
      title="Grievance Redressal Policy"
      lastUpdated="25 June 2025"
      intro="OMNI Fincon Financial Services Private Limited is committed to providing high-quality advisory services. We take all client grievances seriously and have established a structured redressal mechanism to ensure prompt, fair, and transparent resolution of all complaints in accordance with applicable SEBI, RBI, and consumer protection guidelines."
      sections={[
        { heading: "Our Commitment",
          body: "We commit to: (a) acknowledging all complaints within 3 business days of receipt; (b) resolving routine complaints within 15 business days; (c) resolving complex complaints within 30 business days; (d) keeping you informed of progress at each stage; and (e) providing clear reasons in the event a complaint cannot be fully resolved."
        },
        { heading: "How to Raise a Complaint",
          body: [
            "Email: grievance@omnifincon.com — Please include your full name, contact number, client ID (if applicable), and a detailed description of the issue.",
            "Phone: +91 95000 63064 — Available Monday to Saturday, 9:30 AM to 6:30 PM IST.",
            "Written: Grievance Officer, OMNI Fincon Financial Services Pvt. Ltd., Level 4, Cyber Towers, Hitech City, Hyderabad – 500081.",
            "In Person: You may visit any of our offices during business hours to speak with the Grievance Officer.",
          ]
        },
        { heading: "Grievance Officer",
          body: "Our designated Grievance Officer is Ms. Kavitha Reddy (Head – Regulatory & Compliance). Contact: kavitha@omnifincon.com | +91 95000 63064. She is responsible for overseeing the complaint resolution process and ensuring compliance with this policy."
        },
        { heading: "Escalation Process",
          body: [
            "Level 1: Submit your complaint via any channel listed above. You will receive an acknowledgement within 3 business days.",
            "Level 2: If unsatisfied with the Level 1 resolution within 15 days, escalate to the Grievance Officer directly at grievance@omnifincon.com with 'Escalation' in the subject line.",
            "Level 3: If the complaint remains unresolved within 30 days, you may escalate to senior management at md@omnifincon.com.",
            "External Escalation: If not satisfied with our resolution, you may approach the relevant regulatory authority (SEBI SCORES for securities-related complaints, RBI Integrated Ombudsman for banking-related complaints).",
          ]
        },
        { heading: "SEBI SCORES Platform",
          body: "For complaints related to securities services, investors may use the SEBI SCORES (SEBI Complaints Redress System) platform available at scores.sebi.gov.in. Please note your complaint registration number for tracking purposes."
        },
        { heading: "Turnaround Time Standards",
          body: [
            "Acknowledgement of Complaint: Within 3 business days of receipt.",
            "Interim Update: Within 10 business days if resolution requires more time.",
            "Final Resolution: Within 15 business days for routine complaints; 30 business days for complex complaints.",
            "Written Explanation: Provided within 5 business days if a complaint cannot be resolved.",
          ]
        },
        { heading: "Types of Complaints Covered",
          body: [
            "Quality of advisory services or recommendations.",
            "Delay or failure in loan facilitation or document processing.",
            "Incorrect, misleading, or incomplete information provided.",
            "Fee disputes, refund requests, or billing errors.",
            "Confidentiality breaches or data security concerns.",
            "Conduct of OMNI Fincon staff or representatives.",
          ]
        },
        { heading: "No Retaliation Policy",
          body: "We strictly prohibit any form of retaliation against clients or employees who raise grievances in good faith. All complaints are treated with complete confidentiality. Employees found to have retaliated against a complainant will face disciplinary action."
        },
      ]}
    />
  );
}
