export default function TermsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-20">
          <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-neutral-500 font-light leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using Borrow (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Account Registration</h2>
              <p>When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Products and Pricing</h2>
              <p>We strive to display accurate product descriptions, prices, and availability. However, we reserve the right to correct errors, update information, or cancel orders if inaccurate information exists. Prices are subject to change without notice.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Orders and Payment</h2>
              <p>By placing an order, you agree to pay the specified price plus any applicable taxes and shipping fees. We reserve the right to refuse or cancel any order. Payment is due at the time of purchase and is processed securely through our payment partners.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Shipping and Delivery</h2>
              <p>Shipping times are estimates and not guaranteed. Risk of loss passes to you upon delivery. We are not responsible for delays caused by carriers or circumstances beyond our control. See our Shipping page for details.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Returns and Refunds</h2>
              <p>Our return policy allows returns within 30 days of delivery for eligible items. Refunds are processed to the original payment method. See our Returns page for complete details.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Intellectual Property</h2>
              <p>All content on the Service — including text, graphics, logos, images, and software — is the property of Borrow or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Limitation of Liability</h2>
              <p>Borrow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability shall not exceed the amount you have paid us in the past 12 months.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Termination</h2>
              <p>We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or any other reason at our discretion.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Changes to Terms</h2>
              <p>We may update these terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Contact</h2>
              <p>For questions about these Terms of Service, please contact us at legal@borrow.com or through our Contact page.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
