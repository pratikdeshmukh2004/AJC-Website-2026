import type { Metadata } from "next";
import { LegalPage, LegalSection, SiteLink } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use & Copyright Notice",
  description:
    "Terms of use, disclaimers and intellectual property conditions for www.apekshajain.in, owned and operated by AJC Creative Consultancy.",
};

/** Figma: "Terms & Conditions" (node 2918:986). */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use & Copyright Notice">
      <p>
        Welcome to{" "}
        <strong>
          <SiteLink />
        </strong>
        . This website is owned and operated by <strong>AJC Creative Consultancy</strong> (legal
        property of <strong>Apeksha Jain).</strong> By accessing or browsing this platform, you
        acknowledge that you have read, understood, and agreed to be bound by the following terms,
        disclaimers, and intellectual property conditions.
      </p>

      <LegalSection heading="Intellectual Property & Brand Rights">
        <p>
          All content, material, and intellectual property displayed on www.apekshajain.in—including
          but not limited to brand identity systems, strategy frameworks, architectural and interior
          renders, photography, spatial concepts, copywriting, graphics, logos, and custom editorial
          layouts—are the exclusive property of AJC Creative Consultancy unless otherwise explicitly
          credited.
        </p>
        <p>
          The creative work featured on this platform reflects proprietary design concepts, client
          deliverables, and strategic frameworks developed by Apeksha Jain.
        </p>
        <p>
          Unauthorised copying, reproduction, distribution, downloading, modification, or commercial
          exploitation of any material on this website, in whole or in part, without prior written
          consent from AJC Creative Consultancy is strictly prohibited. Any unauthorised use or
          infringement of our intellectual property may result in immediate legal action under
          applicable copyright and intellectual property laws.
        </p>
      </LegalSection>

      <LegalSection heading="Website Disclaimer">
        <p>
          The information contained on this website is provided for general informational,
          portfolio, and creative advisory purposes only. While we endeavour to keep all
          information, portfolio archives, and project descriptions accurate and up to date, AJC
          Creative Consultancy makes no representations or warranties of any kind, express or
          implied, regarding the completeness, accuracy, reliability, suitability, or availability
          of the website or the information, services, or related visuals contained herein. Any
          reliance you place on such information is strictly at your own risk.
        </p>
        <p>
          In no event shall AJC Creative Consultancy or Apeksha Jain be liable for any loss or
          damage, including, without limitation, indirect or consequential loss, or any loss of data
          or business profits, arising out of, or in connection with, the use or performance of this
          website.
        </p>
      </LegalSection>

      <LegalSection heading="Service Availability & Third-Party Links">
        <p>
          Every effort is made to ensure www.apekshajain.in operates smoothly and remains
          accessible. However, AJC Creative Consultancy takes no responsibility for, and will not be
          liable for, the website being temporarily unavailable due to technical maintenance,
          hosting downtime, or unforeseen disruptions beyond our reasonable control.
        </p>
        <p>
          Through this website, you may be able to link to external platforms, social media
          profiles, or third-party websites that are not under the control of AJC Creative
          Consultancy. We have no control over the nature, content, security, or availability of
          those external sites. The inclusion of any link does not imply a endorsement or
          recommendation of the views, services, or products expressed within them.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These terms and all matters arising from your access to <SiteLink /> are governed by and
          construed in accordance with the laws of India. Any legal disputes or claims arising
          hereunder are subject to the exclusive jurisdiction of the competent courts in New Delhi,
          India.
        </p>
        <p>
          If you wish to request written permission to feature our work, inquire about intellectual
          property licensing, or ask questions regarding these terms, please contact:
        </p>
        <address className="mt-[1.15em] not-italic">
          AJC Creative Consultancy
          <br />
          Principal: Apeksha Jain
          <br />
          Email: apeksha@apekshajain.in
          <br />
          Website: <SiteLink />
        </address>
      </LegalSection>

      <p className="mt-[3.45em]">© 2026. All Rights Reserved.</p>
    </LegalPage>
  );
}
