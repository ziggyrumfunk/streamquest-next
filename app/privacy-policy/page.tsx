import type { Metadata } from "next";
import LegalPage, { type LegalBlock } from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How StreamQuest collects, uses, shares, stores, and protects personal data when you visit the website, sign in to the Creator Dashboard, or work with us as a client.",
};

const blocks: LegalBlock[] = [
  { tag: "h2", text: "Quick summary" },
  { tag: "p", text: "We keep our data use limited to what is needed to run creator campaigns, dashboard access, reporting, support, security, and legal compliance. Where consent is required, we ask for it separately — this policy itself is not a consent gate." },
  { tag: "h2", text: "Contents" },
  { tag: "h2", text: "1. Who We Are" },
  { tag: "p", text: "StreamQuest is the controller of the personal data described in this Privacy Policy when we decide why and how that data is processed." },
  { tag: "h3", text: "Controller" },
  { tag: "p", text: "StreamQuest, registered in the Netherlands under Chamber of Commerce number 85562769." },
  { tag: "h3", text: "Privacy contact" },
  { tag: "p", text: "privacy@streamquest.io · contact@streamquest.io" },
  { tag: "h2", text: "2. Scope of This Policy" },
  { tag: "p", text: "This policy applies to visitors to the StreamQuest website, creators using the Creator Dashboard, clients or prospective clients, and other users who contact us or interact with our services." },
  { tag: "ul", items: ["website visits and contact forms;", "Creator Dashboard sign-in and connected accounts;", "Quest applications, Mission Brief participation, submissions, payouts, and reporting;", "client onboarding, campaign setup, and campaign communication;", "support, security, analytics, and legal compliance activities."] },
  { tag: "h2", text: "3. Personal Data We Collect" },
  { tag: "h3", text: "For creators" },
  { tag: "ul", items: ["name, display name, username, email address, Discord handle, and account identifiers;", "Twitch or other supported platform account ID, public profile data, channel URL, language, and public account metrics;", "Quest applications, submissions, VOD links, clips, screenshots, timestamps, social links, and campaign notes;", "payment-related metadata such as payment status, invoice details you provide, transaction references, and payout records;", "technical and security data such as login records, IP address, browser data, and device information."] },
  { tag: "h3", text: "For clients and prospects" },
  { tag: "ul", items: ["name, email address, company name, billing contact details, and communications;", "campaign briefs, budgets, goals, assets, timelines, and reporting preferences;", "commercial and billing records, including invoices, payment status, and transaction records;", "technical, analytics, and security data from website or platform use."] },
  { tag: "h3", text: "For all users" },
  { tag: "ul", items: ["website usage, visit history, cookies, language settings, and site interaction data;", "support requests, emails, messages, and account communications;", "fraud-prevention, abuse-prevention, and security logs."] },
  { tag: "h2", text: "4. Where We Get Data From" },
  { tag: "p", text: "We collect personal data from different sources depending on how you interact with StreamQuest." },
  { tag: "ul", items: ["Directly from you, such as when you sign in, fill out forms, contact us, apply to a Quest, or send campaign materials.", "From connected platforms, such as Twitch, when you authorize a connection and the platform makes data available to us through permitted APIs or OAuth.", "From public sources, such as publicly visible channel data, VODs, clips, public metrics, or publicly posted campaign content.", "From clients or partners, for example where a client gives us campaign-specific information or approved creator-related context needed to operate a campaign.", "From processors and service providers, such as payment providers, analytics providers, support tools, or hosting services."] },
  { tag: "h2", text: "5. How We Use Data and Legal Bases" },
  { tag: "p", text: "We only process personal data where we have a valid legal basis." },
  { tag: "h3", text: "Account creation, sign-in, and connected accounts" },
  { tag: "p", text: "Purpose: authenticate users, create dashboard access, connect Twitch or other supported platforms, and manage accounts. Legal basis: performance of a contract or steps requested before entering into a contract." },
  { tag: "h3", text: "Quest applications and campaign management" },
  { tag: "p", text: "Purpose: match creators and campaigns, manage Mission Briefs, verify submissions, generate reports, and coordinate campaign communication. Legal basis: performance of a contract and our legitimate interests in operating the platform." },
  { tag: "h3", text: "Payouts, invoicing, bookkeeping, and compliance" },
  { tag: "p", text: "Purpose: manage payments, financial administration, reconciliations, tax records, and legal compliance. Legal basis: performance of a contract and legal obligation." },
  { tag: "h3", text: "Support and service communications" },
  { tag: "p", text: "Purpose: answer requests, resolve issues, and provide account or campaign updates. Legal basis: performance of a contract and legitimate interests." },
  { tag: "h3", text: "Security, abuse prevention, and fraud detection" },
  { tag: "p", text: "Purpose: protect the platform, detect fake engagement, investigate misuse, and secure accounts and campaigns. Legal basis: legitimate interests and, where applicable, legal obligation." },
  { tag: "h3", text: "Analytics and service improvement" },
  { tag: "p", text: "Purpose: understand how the website and platform are used and improve functionality, reporting, and reliability. Legal basis: legitimate interests for strictly limited analytics where permitted, or consent where required." },
  { tag: "h3", text: "Optional marketing or newsletter communications" },
  { tag: "p", text: "Purpose: send optional updates, invitations, or marketing communications. Legal basis: consent where required, or legitimate interests where lawful." },
  { tag: "h3", text: "Legal claims and business protection" },
  { tag: "p", text: "Purpose: enforce agreements, defend claims, handle disputes, and protect StreamQuest’s rights and users. Legal basis: legitimate interests and, where applicable, legal obligation." },
  { tag: "h2", text: "6. Data Required to Use the Service" },
  { tag: "p", text: "Some personal data is necessary for us to provide the service or enter into a contract with you." },
  { tag: "ul", items: ["If you do not provide required account, contact, or connected-platform data, you may not be able to sign in, access the Creator Dashboard, apply to Quests, participate in campaigns, or receive payouts.", "If a client does not provide sufficient contact, billing, campaign, or legal information, we may not be able to launch or manage the requested campaign.", "Other data is optional and may only be provided if you choose to share it."] },
  { tag: "h2", text: "7. Who We Share Data With" },
  { tag: "p", text: "We may share personal data with the following categories of recipients where necessary:" },
  { tag: "ul", items: ["Clients / brands, for campaign execution, review, reporting, and payment reconciliation;", "processors and service providers, such as hosting, cloud storage, analytics, support, communications, and payment tools;", "platform partners, such as Twitch or other supported services, where the integration requires data exchange;", "professional advisers, such as accountants, auditors, legal advisers, or insurers where needed;", "public authorities or regulators, where required by law, court order, or regulatory request;", "business transaction counterparties, if StreamQuest is involved in a merger, transfer, restructuring, or sale of assets."] },
  { tag: "h2", text: "8. Creator Data and Brand Contact Restrictions" },
  { tag: "p", text: "Brands may receive limited creator data where reasonably necessary for campaign execution, review, reporting, and commercial reconciliation. This may include creator display names, public channel information, content links, screenshots, timestamps, language, campaign performance data, and payout or completion status where relevant." },
  { tag: "ul", items: ["Brands may use creator information only for campaign execution, campaign review, campaign reporting, and closely related operational follow-up.", "Brands may not use creator data for unrelated marketing or outreach unless they have a separate lawful basis to do so, such as direct consent.", "Where a brand receives creator data for its own purposes, it may act as a separate controller and is responsible for complying with applicable privacy laws."] },
  { tag: "h2", text: "9. International Transfers" },
  { tag: "p", text: "Some of our providers or partners may process personal data outside the European Economic Area." },
  { tag: "ul", items: ["Where personal data is transferred outside the EEA, we aim to use an appropriate transfer mechanism such as an adequacy decision or Standard Contractual Clauses.", "We may also use supplementary technical and organizational measures where appropriate.", "You may contact us if you would like more information about applicable transfer safeguards."] },
  { tag: "h2", text: "10. Cookies and Analytics" },
  { tag: "p", text: "We use cookies and similar technologies to operate the website and understand how it is used." },
  { tag: "ul", items: ["Essential cookies help keep the site working, remember basic settings, and support sign-in or session functionality where needed.", "Limited analytics cookies may be used where permitted to understand traffic and performance in a privacy-conscious way.", "Non-essential analytics, tracking, or similar cookies should only be placed after consent where required by applicable law."] },
  { tag: "p", text: "You can manage cookie preferences through any cookie banner or settings tool we provide, and you can also manage cookies through your browser settings. Blocking certain cookies may affect site functionality." },
  { tag: "h2", text: "11. Retention" },
  { tag: "ul", items: ["Account and profile data: generally retained while the account is active and for a reasonable period afterward if needed for support, security, fraud prevention, or disputes.", "Campaign records and financial records: retained for as long as needed for contractual, legal, tax, accounting, or audit purposes, and in many cases up to 7 years or longer if required by law or an ongoing dispute.", "Analytics data: retained only as long as reasonably needed for analytics purposes, for example up to 14 months where that aligns with your settings and lawful basis.", "Deleted accounts: generally removed or anonymized within approximately 90 days, except where we need to retain certain information longer for legal, security, anti-fraud, or bookkeeping reasons."] },
  { tag: "h2", text: "12. Security" },
  { tag: "p", text: "We use appropriate technical and organizational measures designed to protect personal data against unauthorized access, loss, misuse, alteration, or disclosure." },
  { tag: "ul", items: ["Examples may include access controls, least-privilege practices, encryption in transit where appropriate, secure hosting, authentication controls, logging, backups, and provider vetting.", "Access to personal data is limited to people and providers who need it for legitimate operational purposes."] },
  { tag: "h2", text: "13. Your Privacy Rights" },
  { tag: "p", text: "Depending on the circumstances and applicable law, you may have the right to:" },
  { tag: "ul", items: ["request access to your personal data;", "request correction of inaccurate or incomplete data;", "request deletion of personal data;", "request restriction of processing;", "object to certain processing, especially where based on legitimate interests;", "request data portability where the legal conditions are met;", "withdraw consent at any time where processing is based on consent, without affecting processing already carried out before withdrawal;", "lodge a complaint with the Dutch Data Protection Authority, the Autoriteit Persoonsgegevens."] },
  { tag: "p", text: "Rights are not absolute and may be limited where an exception applies, for example to protect the rights of others, comply with law, or preserve legal claims." },
  { tag: "h2", text: "14. Automated Decision-Making" },
  { tag: "p", text: "StreamQuest may use data-driven sorting, campaign-fit checks, fraud signals, or prioritization logic to help operate the platform and campaigns." },
  { tag: "ul", items: ["This may include considering factors such as connected account status, public metrics, language, geography, prior completion history, timing, and campaign fit.", "At the time of this policy, StreamQuest does not intend to rely on solely automated decision-making that produces legal effects or similarly significant effects on individuals without meaningful human involvement."] },
  { tag: "h2", text: "15. Children" },
  { tag: "p", text: "StreamQuest is not intended for children under 18. We do not knowingly collect personal data from children under 18 for platform use. If you believe a minor has provided personal data to us in breach of this rule, please contact us and we will investigate and take appropriate steps." },
  { tag: "h2", text: "16. Changes to This Policy" },
  { tag: "p", text: "We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or operational practices." },
  { tag: "ul", items: ["The latest version will be posted on this page with an updated “Last updated” date.", "Where appropriate, we may also provide additional notice through the platform or by email.", "If a processing activity requires consent, we will seek that consent separately where required rather than relying on this policy alone."] },
  { tag: "h2", text: "17. Contact" },
  { tag: "p", text: "For privacy questions, data subject requests, or complaints about how we handle personal data, contact us at privacy@streamquest.io or contact@streamquest.io." },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How StreamQuest collects, uses, shares, stores, and protects personal data when you visit the website, sign in to the Creator Dashboard, connect Twitch or another supported platform, apply to a Quest, work with us as a client, or otherwise use our services."
      lastUpdated="May 2026"
      blocks={blocks}
    />
  );
}
