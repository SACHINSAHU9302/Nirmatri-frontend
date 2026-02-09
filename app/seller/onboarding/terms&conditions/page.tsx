'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SellerTermsPage() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // HANDLERS
  // ============================================
  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    if (!agreed) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to save terms acceptance
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Replace with actual API call
    // await fetch('/api/seller/accept-terms', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ accepted: true, timestamp: new Date() })
    // });
    
    // Redirect to dashboard or next step
    router.push('/seller/dashboard/');
  };

  // ============================================
  // TERMS CONTENT
  // ============================================
  const termsContent = [
    {
      title: '1. Seller Eligibility',
      content: 'By registering as a seller on Nirmatri Crafts, you confirm that you are highlighting authentic, handcrafted items. We reserve the right to verify the origin of your products and request additional documentation if needed.'
    },
    {
      title: '2. Commissions & Fees',
      content: 'Nirmatri Crafts charges a standard 10% platform fee on every successful sale. This covers payment processing, marketing for your products, customer support, and platform maintenance. Additional fees may apply for premium features.'
    },
    {
      title: '3. Product Authenticity',
      content: 'All products must be handmade, handcrafted, or artisanal. Mass-produced items, counterfeit goods, or items misrepresented as handmade are strictly prohibited. We conduct regular quality checks to maintain marketplace integrity.'
    },
    {
      title: '4. Shipping Policy',
      content: 'Sellers are responsible for packaging products safely and securely. Orders must be dispatched within 48 hours of confirmation unless otherwise specified. Failure to ship on time may result in store penalties, reduced visibility, or account suspension.'
    },
    {
      title: '5. Payout Schedule',
      content: 'Funds from sales are held in escrow for 7 days post-delivery to handle potential returns or disputes. Payouts are processed every Monday directly to your registered bank account. Minimum payout threshold is ₹500.'
    },
    {
      title: '6. Returns & Refunds',
      content: 'Sellers must honor our 7-day return policy for damaged or defective items. Return shipping costs for seller errors will be deducted from your account. Customer satisfaction is our priority.'
    },
    {
      title: '7. Prohibited Items',
      content: 'Mass-produced industrial goods, hazardous materials, illegal substances, weapons, copyrighted designs without permission, and any items violating Indian law are strictly prohibited. Violations may result in immediate account termination.'
    },
    {
      title: '8. Intellectual Property',
      content: 'You retain ownership of your product designs. However, by listing on Nirmatri, you grant us a license to display, market, and promote your products across our platforms and marketing channels.'
    },
    {
      title: '9. Account Termination',
      content: 'We reserve the right to suspend or terminate seller accounts for policy violations, fraudulent activity, poor customer ratings, or failure to maintain quality standards. Termination procedures are outlined in our dispute resolution policy.'
    },
    {
      title: '10. Changes to Terms',
      content: 'Nirmatri reserves the right to modify these terms at any time. Sellers will be notified via email 30 days before changes take effect. Continued use of the platform constitutes acceptance of updated terms.'
    },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          
          {/* ============================================ */}
          {/* STEPPER HEADER */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-10 text-center"
          >
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
              <StepCircle num={1} label="Identity" complete />
              <div className="h-0.5 w-8 md:w-12 bg-blue-600 dark:bg-blue-500 rounded" />
              <StepCircle num={2} label="Store" complete />
              <div className="h-0.5 w-8 md:w-12 bg-blue-600 dark:bg-blue-500 rounded" />
              <StepCircle num={3} label="Legal" active />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Terms of Service
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Please review our seller agreement carefully before proceeding
            </p>
          </motion.div>

          {/* ============================================ */}
          {/* TERMS CONTAINER */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Scrollable Terms Content */}
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-6 md:p-8 space-y-6 
                          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 
                          scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
              {termsContent.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="scroll-mt-4"
                >
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {section.content}
                  </p>
                </motion.section>
              ))}

              {/* Additional Legal Information */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  <strong>Last Updated:</strong> February 4, 2026<br />
                  <strong>Effective Date:</strong> February 1, 2026<br />
                  <strong>Version:</strong> 2.1<br />
                  <strong>Jurisdiction:</strong> India
                </p>
              </div>
            </div>

            {/* ============================================ */}
            {/* BOTTOM ACTIONS */}
            {/* ============================================ */}
            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              {/* Checkbox Agreement */}
              <label className="flex items-start gap-3 cursor-pointer group mb-6">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 
                           text-blue-600 focus:ring-2 focus:ring-blue-500 
                           transition-all cursor-pointer flex-shrink-0"
                  aria-label="Agree to terms and conditions"
                />
                <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 
                               group-hover:text-gray-900 dark:group-hover:text-white 
                               transition-colors">
                  I have read and understood the agreement, and I accept all terms and conditions of Nirmatri Crafts as a seller on this platform.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button 
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold 
                           text-gray-700 dark:text-gray-300 
                           bg-white dark:bg-gray-700 
                           border-2 border-gray-300 dark:border-gray-600 
                           hover:bg-gray-50 dark:hover:bg-gray-600 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200
                           focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  ← Back
                </button>
                
                <button 
                  onClick={handleConfirm}
                  disabled={!agreed || isSubmitting}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-white 
                           shadow-lg transition-all duration-200
                           focus:ring-2 focus:ring-blue-500 focus:outline-none
                           ${
                             agreed && !isSubmitting
                             ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105' 
                             : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-500 shadow-none'
                           }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Confirm & Start Selling →'
                  )}
                </button>
              </div>

              {/* Warning Message */}
              {!agreed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-amber-600 dark:text-amber-500 mt-4"
                >
                  ⚠️ You must accept the terms to continue
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* HELP SECTION */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 md:mt-8 text-center space-y-2"
          >
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              Have questions about these terms?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
              <a 
                href="mailto:legal@nirmatri.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                📧 legal@nirmatri.com
              </a>
              <span className="text-gray-400">•</span>
              <a 
                href="/help" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                📚 Help Center
              </a>
              <span className="text-gray-400">•</span>
              <a 
                href="/faq" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ❓ FAQs
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ============================================ */
/* STEP CIRCLE COMPONENT */
/* ============================================ */
function StepCircle({ 
  num, 
  label, 
  active = false, 
  complete = false 
}: {
  num: number;
  label: string;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 md:gap-2 group">
      <div 
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center 
                   text-xs md:text-sm font-bold border-2 transition-all duration-300
                   ${
                     complete 
                     ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white shadow-lg shadow-blue-500/30' 
                     : active 
                       ? 'bg-white dark:bg-gray-800 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 scale-110 shadow-lg shadow-blue-500/20' 
                       : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                   }`}
        aria-label={`Step ${num}: ${label}${complete ? ' - Complete' : active ? ' - Active' : ''}`}
      >
        {complete ? '✓' : num}
      </div>
      <span 
        className={`text-[10px] md:text-xs font-bold uppercase tracking-tight transition-colors duration-300
                   ${
                     active 
                     ? 'text-blue-600 dark:text-blue-400' 
                     : complete 
                       ? 'text-gray-600 dark:text-gray-400'
                       : 'text-gray-400 dark:text-gray-500'
                   }`}
      >
        {label}
      </span>
    </div>
  );
}