import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Voguish Moments" },
      { name: "description", content: "Privacy Policy for Voguish Moments Perfumes." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <section className="max-w-[800px] mx-auto px-6 pt-10 pb-20 animate-fade-up">
        <h1 className="font-display text-4xl md:text-5xl mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none text-muted-foreground space-y-6 leading-relaxed">
          <p>
            This Privacy Policy describes how Voguish Moments (the “Site” or “we”) collect, use, and disclose your Personal Information when you visit or make a purchase from the Site.
          </p>

          <p>
            We value and appreciate the trust you place in Voguish Moments. Hence, we insist upon the highest standards of customer customer information policy. Please read the following statement to learn about our information gathering and dissemination practices.
          </p>

          <p className="italic text-sm text-stone-500">
            Please note: Our Privacy Policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Collecting Personal Information</h2>
          <p>
            When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information.” See the list below for more information about what Personal Information we collect and why.
          </p>

          <h3 className="font-display text-base md:text-lg text-foreground pt-2">Device information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Examples of Personal Information collected:</strong> version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</li>
            <li><strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.</li>
            <li><strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
          </ul>

          <h3 className="font-display text-base md:text-lg text-foreground pt-2">Order information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Examples of Personal Information collected:</strong> name, billing address, shipping address, payment information (including transaction numbers), email address, and phone number.</li>
            <li><strong>Purpose of collection:</strong> to provide products or services to you to fulfil our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            <li><strong>Source of collection:</strong> collected from you.</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Sharing Personal Information</h2>
          <p>
            We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Using Personal Information</h2>
          <p>
            Voguish Moments uses your personal Information to provide our services to you, which includes: processing payments, shipping, fulfilment of your order and any legal requirements.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Security Precautions</h2>
          <p>
            Our site has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Cookies</h2>
          <p>
            A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or if they are a frequent visitor.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Changes</h2>
          <p>
            We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">Contact</h2>
          <p>
            For any questions regarding this policy, feel free to reach us at <a href="mailto:voguishmoments@gmail.com" className="text-foreground underline">voguishmoments@gmail.com</a>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
