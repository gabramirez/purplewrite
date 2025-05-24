"use client"

import Link from "next/link"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import Header from "@/components/ui/Header"
export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
     <Header/>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated 01/01/2025</p>

          <div className="prose prose-gray max-w-none">
            <p>
              Purple Write ("we," "us," or "our") operates the Purple Write website and services (the "Services"). This
              Privacy Policy describes how we collect, use, and share information about you when you use our Services.
            </p>

            <p>
              Please read this policy carefully. By accessing or using our Services, you agree to this Privacy Policy.
              If you do not not agree, please do not use our Services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Table of Contents</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>
                <Link href="#information-we-collect" className="text-primary hover:underline">
                  Information We Collect
                </Link>
              </li>
              <li>
                <Link href="#how-we-use" className="text-primary hover:underline">
                  How We Use Your Information
                </Link>
              </li>
              <li>
                <Link href="#sharing" className="text-primary hover:underline">
                  Sharing Your Information
                </Link>
              </li>
              <li>
                <Link href="#cookies" className="text-primary hover:underline">
                  Cookies and Tracking
                </Link>
              </li>
              <li>
                <Link href="#third-party" className="text-primary hover:underline">
                  Third-Party Links
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-primary hover:underline">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#your-choices" className="text-primary hover:underline">
                  Your Choices
                </Link>
              </li>
              <li>
                <Link href="#childrens-privacy" className="text-primary hover:underline">
                  Children's Privacy
                </Link>
              </li>
              <li>
                <Link href="#international" className="text-primary hover:underline">
                  International Transfers
                </Link>
              </li>
              <li>
                <Link href="#changes" className="text-primary hover:underline">
                  Changes to This Policy
                </Link>
              </li>
              <li>
                <Link href="#contact-us" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </li>
            </ol>

            <h2 id="information-we-collect" className="text-2xl font-bold mt-10 mb-4">
              1. Information We Collect
            </h2>
            <p>We collect information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Account Information:</strong> Name, email, password when you register.
              </li>
              <li>
                <strong>Usage Data:</strong> Content you submit for processing (e.g., text you check or transform).
              </li>
              <li>
                <strong>Communications:</strong> Any messages you send through support or feedback forms.
              </li>
            </ul>

            <p className="mt-4">We also collect certain information automatically:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Device & Browser Data:</strong> IP address, browser type, operating system, and device
                identifiers.
              </li>
              <li>
                <strong>Usage Metrics:</strong> Pages viewed, features used, and time spent.
              </li>
            </ul>

            {/* Additional sections would continue here */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Purple Write</div>
            <div className="flex space-x-6">
              <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700">
                Pricing
              </Link>
              <Link href="/affiliate" className="text-sm text-gray-500 hover:text-gray-700">
                Earn with us
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
