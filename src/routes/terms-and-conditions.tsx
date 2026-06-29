import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Voguish Moments" },
      { name: "description", content: "Terms and Conditions of use for Voguish Moments." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="max-w-[800px] mx-auto px-6 pt-10 pb-20 animate-fade-up">
        <h1 className="font-display text-4xl md:text-5xl mb-8 text-foreground">Terms and Conditions</h1>
        
        <div className="prose prose-stone max-w-none text-muted-foreground space-y-6 leading-relaxed">
          <p className="italic">Terms of use and other disclaimers</p>

          <p>
            All information, products and services displayed on the Site constitute an “invitation to offer”. Your order for purchase constitutes your “offer” which shall be subject to the terms and conditions as listed below. The website has the right to accept or reject your offer without assigning any reason thereof.
          </p>

          <p>
            By subscribing to or using any of our services you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. If you do not want to be bound by the Terms, you must not subscribe to or use our services.
          </p>

          <p>
            We reserve the right to add, delete, alter or modify these terms and conditions at any time. You are therefore advised to read carefully these terms and conditions every time you use the website of Voguish Moments.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">1. Shipping</h2>
          <p>
            We will not be responsible for any damage suffered by users from use of the services on our website. This without limitation includes loss of revenue or data resulting from delays, non-deliveries, missed deliveries, or service interruptions as may occur because of any act / omission of the vendor. This disclaimer of liability also applies to any damages or injury caused by any failure of performance, negligence, defect, deletion, error, omission, interruption, delay in operation or transmission, computer virus, communication line failure, theft or destruction or unauthorized access to, alteration of, or use of record, whether for breach of contract, tortuous behaviour, or under any other cause of action.
          </p>

          <p>
            Sometimes Delivery may take longer due to the following reasons:
          </p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>Bad Weather Conditions</li>
            <li>Transport Delays</li>
            <li>Political Disruption Scenarios</li>
            <li>Other Unforeseen Circumstances</li>
          </ul>
          <p>
            We will not be able to compensate for any mental agony caused due to delay in delivery.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">2. Fraudulent Orders/Loss of Business Orders</h2>
          <p>
            To provide a safe and secure shopping experience, we regularly scan for fraudulent transactions and suspicious activity. We reserve the right to cancel all past, pending and future orders without any liability.
          </p>
          <p>
            The customer may be considered a loss of business in any of the following cases:
          </p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>The customer has a very high exchange rate</li>
            <li>Invalid or Incomplete address</li>
            <li>Repeated request for monetary compensation for petty issues</li>
            <li>The prices and availability of products are subject to change without prior notice at our sole discretion</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">3. Cancellation of Orders</h2>
          <p>
            We reserve the right to refuse or cancel any order placed for a product that is listed at an incorrect price or for any other reason. This shall be regardless of whether the order has been confirmed and/or payment has been received. The payment shall be refunded and the User shall be informed of the same.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">4. Delivery Mistakes</h2>
          <p>
            If a non-delivery or late delivery occurs due to a mistake by the User (i.e., wrong, or incomplete name or address or recipient not available) any extra cost spent by us for re-delivery shall be claimed from the User placing the order.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">5. User Information</h2>
          <p>
            The User agrees to give accurate, authentic and true information. We reserve the right to confirm and validate the information and other details provided by the User at any point of time. If any such User details are found not to be true wholly or partly, we have the right in its sole discretion to reject the registration and debar the User from using the services without prior intimation whatsoever.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">6. Payment Fraud</h2>
          <p>
            We will not be liable for any type or kind of online payment transaction fraud. The liability to use a card fraudulently will be on the user and the onus to ‘prove otherwise’ shall be exclusively on the user.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground pt-4">7. Governing Law</h2>
          <p>
            This agreement shall be construed in accordance with the applicable laws of India. The Courts at Mumbai shall have exclusive jurisdiction in any proceedings arising out of this agreement.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
