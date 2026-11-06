import type { Metadata } from "next";
import { LegalPage, LegalSection, SiteLink } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AJC Creative Consultancy collects, uses, stores and protects your information on www.apekshajain.in.",
};

/** Figma: "Privacy Policy" (node 2993:14). */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy applies to <strong>AJC Creative Consultancy</strong> (<SiteLink />
        ), where we believe in keeping things clear, considered and respectful, including the way we
        handle your personal information.
      </p>
      <p>
        This Policy describes how we collect, use, store, and protect your information when you
        visit <SiteLink />, submit an enquiry, or interact with our digital platforms, alongside the
        choices available to you under applicable laws.
      </p>

      <LegalSection heading="Information We Collect">
        <p>
          We collect information directly from you when you voluntarily choose to share it, as well
          as limited technical data gathered automatically when you navigate our site.
        </p>

        <LegalSection level={3} heading="Information You Provide Directly">
          <p>
            When you submit an enquiry or correspond with us via email, WhatsApp, or social media,
            we collect details such as your full name, email address, phone number, and physical
            location, along with your company or brand name, website, and social handles. We also
            receive any project specifications, scope details, timelines, and budget considerations
            shared during our discovery conversations.
          </p>
        </LegalSection>

        <LegalSection level={3} heading="Technical & Demographic Information">
          <p>
            When you browse our website, we passively log standard technical metrics including your
            IP address, device type, browser version, general location, referring source, and page
            interaction patterns.
          </p>
        </LegalSection>
      </LegalSection>

      <LegalSection heading="How We Use Your Information">
        <p>
          We use the information you share with us to understand your inquiry, respond to you and
          explore whether our services may be relevant to your brand or business.
        </p>
        <p>We may also use information to:</p>
        <ul className="list-disc ps-[1.5em]">
          <li>Communicate with you about an enquiry or ongoing engagement</li>
          <li>Provide and improve our services</li>
          <li>Understand how our website is being used</li>
          <li>Improve the content, structure and functionality of our website</li>
          <li>Manage our internal records and operations</li>
          <li>Meet applicable legal or regulatory requirements</li>
          <li>Protect the security and integrity of our website and business</li>
        </ul>
        <p>We collect and use information only where there is a relevant reason to do so.</p>
      </LegalSection>

      <LegalSection heading="Confidentiality of Project & Commercial Information">
        <p>
          As a multi-disciplinary consultancy working across brand strategy, identity, and luxury
          hospitality, we routinely handle sensitive commercial plans and upcoming brand launches.
        </p>
        <p>
          Information shared during preliminary discussions or formal proposals is kept strictly
          confidential and used solely to evaluate the prospective engagement. We never sell or
          trade your project data. Once an active contract commences, client confidentiality and
          intellectual property are additionally governed by the specific Non-Disclosure Agreements
          (NDAs) or Master Service Agreements (MSAs) signed between AJC Creative Consultancy and the
          client.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Web Analytics">
        <p>
          Our website uses standard essential cookies to ensure proper operation, layout rendering,
          and security. We also utilise third-party analytics tools (such as Google Analytics) to
          gather aggregated, anonymised interaction metrics to help us understand visitor traffic.
          You can manage or disable cookies at any time through your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing & Disclosure">
        <p>
          We do not sell, rent, or trade personal data. We only share information with trusted
          service providers who assist in operating our website, hosting, and communication systems
          under strict confidentiality terms. We may also disclose information if required to do so
          by applicable law, legal process, or lawful authority requests to protect our firm&apos;s
          legal rights and operational security.
        </p>
      </LegalSection>

      <LegalSection heading="Security & Data Retention">
        <p>
          We implement reasonable technical and organisational measures to safeguard your data
          against unauthorised access, loss, or misuse. While no digital system can guarantee
          complete security, we retain personal data only for as long as necessary to fulfil the
          purpose for which it was collected, maintain accurate business logs, and satisfy legal
          obligations before securely deleting it.
        </p>
      </LegalSection>

      <LegalSection heading="External Links & Your Privacy Rights">
        <p>
          Our website may link to third-party platforms or social media accounts, whose privacy
          practices are governed by their own individual policies. Read the privacy policy of other
          websites carefully. We are not responsible for third-party sites.
        </p>
        <p>
          Depending on applicable law, you may have rights relating to your personal information,
          including the right to request access to, correction of, or deletion of personal
          information, and to withdraw consent where processing is based on consent.
        </p>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:apeksha@apekshajain.in">apeksha@apekshajain.in</a>. We may need to verify
          your identity before responding.
        </p>
      </LegalSection>

      <LegalSection heading="Updates To This Policy">
        <p>
          This privacy policy was last update on 15.10.2026. We may update this Privacy Policy from
          time to time as our website, services, practices or applicable legal requirements change.
          The latest version will always be published on this page, along with the date it was last
          updated.
        </p>
      </LegalSection>

      <LegalSection heading="Jurisdiction">
        <p>
          This site and all associated engagements are governed by the laws of India. Any legal
          disputes or claims arising hereunder are subject to the exclusive jurisdiction of the
          competent courts in New Delhi, India.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
