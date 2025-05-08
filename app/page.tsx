import Image from "next/image"
import Link from "next/link"
import { ClipboardIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/document-icon-green.png" alt="Natural Write Logo" width={24} height={24} />
            <span className="text-lg font-medium">Natural Write</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Earn with us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link
              href="#"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Try for free
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Log in
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Humanize AI Text & Outsmart AI Detectors</h1>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium mb-4">Your Text</h2>

          <div className="min-h-[300px] border border-gray-200 rounded-lg p-4 mb-4">
            <textarea
              placeholder="Paste your text here..."
              className="w-full h-full min-h-[250px] resize-none focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">0 / 250 words</div>

            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
                <ClipboardIcon className="w-4 h-4" />
                <span>Paste Text</span>
              </button>

              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Check for AI
              </button>

              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                Humanize
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Natural Write</div>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Earn with us
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
