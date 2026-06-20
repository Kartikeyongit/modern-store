export default function PrivacyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-20">
          <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Legal</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
              <p>Borrow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly to us, including:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Personal identification information (name, email address, phone number, shipping address)</li>
                <li>Payment information (processed securely by our payment partners)</li>
                <li>Account credentials (email and password)</li>
                <li>Communication preferences</li>
              </ul>
              <p className="mt-3">We also automatically collect certain information when you visit our site, including your IP address, browser type, device information, and browsing behavior.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders, account, and inquiries</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and product offerings</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These providers are contractually obligated to protect your information.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits. However, no method of electronic storage or transmission is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the right to:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Access the personal information we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent at any time</li>
                <li>File a complaint with your local data protection authority</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Cookies</h2>
              <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@borrow.com or through our Contact page.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
