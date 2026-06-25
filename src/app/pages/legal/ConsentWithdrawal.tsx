import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import LegalPage from "./LegalPage";
import { G, NAVY, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW_LG } from "../../../lib/tokens";
import { GlowButton } from "../../components/shared/Atoms";

function ConsentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState("All Marketing Communications");

  return (
    <section className="py-16" style={{ background: NAVY }}>
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="mb-2" style={{ fontFamily: FONT_SERIF, fontSize: "1.5rem", fontWeight: 700, color: TEXT1 }}>
          Submit Consent Withdrawal Request
        </h2>
        <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT2, lineHeight: 1.7 }}>
          Use this form to formally withdraw consent for specific communications from OMNI Fincon. We will process your request within 10 business days.
        </p>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center rounded-2xl"
            style={{ background: `${G}08`, border: `1px solid ${G}20` }}>
            <CheckCircle2 size={40} color={G} />
            <p style={{ fontFamily: FONT_SERIF, fontSize: "1.2rem", fontWeight: 700, color: TEXT1 }}>Request Submitted.</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT2 }}>
              We will process your withdrawal request within 10 business days and send confirmation to your registered email.
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-5 p-8 rounded-2xl"
            style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW_LG }}
            onSubmit={e=>{e.preventDefault();setSubmitted(true);}}>
            {["Full Name *","Registered Email Address *","Registered Phone Number"].map(l => (
              <div key={l}>
                <label className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>{l}</label>
                <input required={l.includes("*")} type={l.includes("Email") ? "email" : "text"}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                  onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                  onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
              </div>
            ))}
            <div>
              <label className="block text-xs mb-2 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Withdraw Consent For *</label>
              <div className="flex flex-col gap-2">
                {["All Marketing Communications","SMS Alerts","Email Newsletters","WhatsApp Messages","Phone Calls","Product Promotions"].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="consent_type" value={opt} checked={type===opt} onChange={()=>setType(opt)}
                      className="w-4 h-4 accent-emerald-500" />
                    <span style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT1 }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Reason (optional)</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
            </div>
            <GlowButton color={G} type="submit" fullWidth size="md">Submit Withdrawal Request <ArrowRight size={14} /></GlowButton>
          </form>
        )}
      </div>
    </section>
  );
}

export default function ConsentWithdrawal() {
  return (
    <>
      <LegalPage
        title="Consent Withdrawal Policy"
        lastUpdated="25 June 2025"
        intro="OMNI Fincon Financial Services Private Limited respects your right to control how we use your personal data and communicate with you. This policy explains how you can withdraw consent for marketing communications, data processing activities, and other consents you have previously granted, in accordance with applicable data protection laws and TRAI regulations."
        sections={[
          { heading: "Your Right to Withdraw Consent",
            body: "You have the right to withdraw consent at any time for: (a) marketing and promotional communications via any channel; (b) non-essential data processing activities; (c) sharing of your information for cross-selling of products or services; and (d) any other consent-based activity you previously agreed to. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal."
          },
          { heading: "How to Withdraw Consent",
            body: [
              "Online Form: Use the consent withdrawal form on this page to submit a formal request.",
              "Email: Send your withdrawal request to privacy@omnifincon.com with the subject 'Consent Withdrawal – [Your Name]'.",
              "Phone: Call +91 95000 63064 and request to speak with our Compliance team.",
              "Written Request: Send a signed letter to OMNI Fincon Financial Services Pvt. Ltd., Level 4, Cyber Towers, Hitech City, Hyderabad – 500081.",
              "Unsubscribe Link: For email communications, click the 'Unsubscribe' link at the bottom of any marketing email.",
              "SMS Opt-Out: Reply STOP to any promotional SMS to opt out of SMS communications.",
            ]
          },
          { heading: "Processing Timeline",
            body: "We will process all consent withdrawal requests within 10 business days of receipt. We will send a written confirmation to your registered email or address once the withdrawal has been processed. Transactional and service communications (e.g., appointment confirmations, loan status updates) cannot be opted out of as they are necessary for service delivery."
          },
          { heading: "Scope of Withdrawal",
            body: [
              "Marketing emails, newsletters, and product promotions.",
              "SMS alerts for offers and new service announcements.",
              "WhatsApp messages (non-essential service communications).",
              "Outbound sales calls and follow-up calls.",
              "Data sharing for third-party cross-selling of financial products.",
            ]
          },
          { heading: "Limitations",
            body: "Withdrawal of consent does not apply to: (a) service-essential communications required for ongoing mandates; (b) regulatory notifications required by law; (c) data processing activities based on legal obligation or legitimate interest rather than consent; or (d) processing of data already completed prior to the withdrawal request."
          },
          { heading: "TRAI Do-Not-Disturb (DND)",
            body: "For commercial communications, you may also register your number on the TRAI DND (National Do Not Call) Registry at trai.gov.in or by calling 1909. We comply with all TRAI regulations and do not contact DND-registered numbers for unsolicited commercial communications."
          },
          { heading: "Contact for Consent Queries",
            body: "For any queries regarding consent withdrawal or data privacy, contact our Data Protection Officer at privacy@omnifincon.com or call +91 95000 63064 during business hours (Monday–Saturday, 9:30 AM–6:30 PM IST)."
          },
        ]}
      />
      <ConsentForm />
    </>
  );
}
