import LegalPage from "./LegalPage";

export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      lastUpdated="25 June 2025"
      intro="The information provided on this website and by OMNI Fincon Financial Services Private Limited ('OMNI Fincon') is for general informational and educational purposes only. It does not constitute financial, investment, legal, or tax advice. Please read this disclaimer carefully before using our website or engaging our services."
      sections={[
        { heading: "No Financial Advice",
          body: "Nothing on this website should be construed as financial advice, an offer to buy or sell securities, or a solicitation of any offer. Investment and credit decisions should be made after thorough due diligence and consultation with a SEBI-registered investment adviser, chartered accountant, or legal counsel appropriate to your specific situation."
        },
        { heading: "No Guarantee of Returns",
          body: "All investments are subject to market risks. Past performance of any investment product, whether discussed on this website or during advisory consultations, is not indicative of future results. OMNI Fincon does not guarantee any specific returns, interest rates, or outcomes from any financial product or service."
        },
        { heading: "Loan Facilitation Disclaimer",
          body: "OMNI Fincon acts as an intermediary and loan facilitator. Approval of any loan application is at the sole discretion of the lending institution. We do not guarantee loan approval, specific interest rates, or loan amounts. Terms and conditions offered by lenders may change without notice and are subject to their internal credit policies."
        },
        { heading: "Regulatory Compliance",
          body: "OMNI Fincon provides regulatory advisory services as a general advisory firm. Our regulatory guidance is based on publicly available regulatory frameworks and our team's experience. It does not constitute a legal opinion. Clients are advised to seek formal legal and regulatory advice before filing applications with RBI, SEBI, IRDAI, or other regulators."
        },
        { heading: "Accuracy of Information",
          body: "While we endeavour to keep the information on this website accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Any reliance you place on such information is strictly at your own risk."
        },
        { heading: "External Links",
          body: "Our website may contain links to external websites. These links are provided for your convenience and information only. OMNI Fincon has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them."
        },
        { heading: "Intellectual Property",
          body: "All content on this website — including text, graphics, logos, data, and software — is the property of OMNI Fincon or its content suppliers and is protected under applicable intellectual property laws. Unauthorised reproduction, distribution, or use of any material is strictly prohibited."
        },
        { heading: "Limitation of Liability",
          body: "To the fullest extent permitted by law, OMNI Fincon shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to or use of this website or our services. This includes, without limitation, damages for loss of data, profits, or business opportunities."
        },
      ]}
    />
  );
}
