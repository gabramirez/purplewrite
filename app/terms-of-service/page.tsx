import Link from "next/link"
import { PurpleWriteLogo } from "../../components/purple-write-logo"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <PurpleWriteLogo className="w-8 h-8 text-primary" />
            <span className="text-lg font-medium">Purple Write</span>
          </Link>
          <div className="flex items-center">
            <nav className="flex items-center space-x-6 mr-6">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/affiliate" className="text-gray-600 hover:text-gray-900">
                Earn with us
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors"
              >
                Try for free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Last updated 01/01/2025</p>

          <div className="prose prose-gray max-w-none">
            <p>
              This Terms of Service agreement is entered into by you ("you" or "your") and Purple Write ("Company,"
              "we," "us," or "our"). These Legal Terms govern your access to and use of our website and any related
              products or services provided by Purple Write (collectively, the "Services"). By accessing or using our
              Services, you agree that you have read, understood, and accepted these Legal Terms.
            </p>

            <p className="mt-4">
              If you do not agree with all of these Legal Terms, you are expressly prohibited from using our Services
              and must discontinue use immediately.
            </p>

            <p className="mt-4">
              Supplemental terms and conditions or additional documents that we may post from time to time are hereby
              incorporated by reference into these Legal Terms. We reserve the right, at our sole discretion, to make
              changes or modifications to these Legal Terms at any time without prior notice. The "Last Updated" date
              above will reflect such changes.
            </p>

            <p className="mt-4">
              It is your responsibility to periodically review these Legal Terms, and your continued use of our Services
              after any changes have been made constitutes your acceptance of the revised terms.
            </p>

            <p className="mt-4">
              The Services are intended for users who are at least 18 years old. Persons under 18 are not permitted to
              use or register for our Services.
            </p>

            <p className="mt-4 italic">
              It is recommended that you print a copy of these Legal Terms for your records.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Table of Contents</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>
                <Link href="#our-services" className="text-primary hover:underline uppercase">
                  OUR SERVICES
                </Link>
              </li>
              <li>
                <Link href="#intellectual-property" className="text-primary hover:underline uppercase">
                  INTELLECTUAL PROPERTY RIGHTS
                </Link>
              </li>
              <li>
                <Link href="#user-representations" className="text-primary hover:underline uppercase">
                  USER REPRESENTATIONS
                </Link>
              </li>
              {/* Additional table of contents items would continue here */}
            </ol>

            <h2 id="our-services" className="text-2xl font-bold mt-10 mb-4">
              1. OUR SERVICES
            </h2>
            <p>
              Purple Write provides AI text humanization services designed to transform AI-generated content into
              human-like writing that can bypass AI detection tools. Our Services include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Text humanization and rewriting</li>
              <li>AI detection bypass</li>
              <li>Grammar and style improvement</li>
              <li>Plagiarism-free content generation</li>
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
