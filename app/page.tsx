"use client"

import Link from "next/link"
import { ClipboardIcon } from "lucide-react"
import { PurpleWriteLogo } from "../components/purple-write-logo"
import { AIDetectionResult } from "../components/ai-detection-result"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [text, setText] = useState("")
  const [showAIDetection, setShowAIDetection] = useState(false)
  const [isCheckingAI, setIsCheckingAI] = useState(false)
  const router = useRouter()

  const handleHumanize = () => {
    if (text.trim()) {
      localStorage.setItem("inputText", text)
      router.push("/results")
    }
  }

  const handleCheckAI = () => {
    if (!text.trim()) return

    setIsCheckingAI(true)
    setShowAIDetection(true)

    // Simulate AI detection
    setTimeout(() => {
      setIsCheckingAI(false)
    }, 3000)
  }

  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      setShowAIDetection(false)
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err)
    }
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  // Mock AI detection data
  const mockDetectors = [
    { name: "Turnitin", status: "detected" as const },
    { name: "GPTZero", status: "warning" as const },
    { name: "OpenAI", status: "detected" as const },
    { name: "Writer", status: "detected" as const },
    { name: "CrossPlag", status: "detected" as const },
    { name: "CopyLeaks", status: "warning" as const },
    { name: "Sapling", status: "detected" as const },
    { name: "Originality", status: "detected" as const },
    { name: "ZeroGPT", status: "warning" as const },
  ]

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
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Humanize AI Text & Outsmart AI Detectors</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Purple Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it
              passes every AI detection tool
            </p>
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-colors font-medium inline-block"
            >
              Try for free
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {!showAIDetection ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium mb-4">Your Text</h2>

                <div className="min-h-[300px] border border-gray-200 rounded-lg p-4 mb-4">
                  <textarea
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full min-h-[250px] resize-none focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">{wordCount} / 250 words</div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handlePasteText}
                      className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors"
                    >
                      <ClipboardIcon className="w-4 h-4" />
                      <span>Paste Text</span>
                    </button>

                    <button
                      onClick={handleCheckAI}
                      disabled={!text.trim()}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Check for AI
                    </button>

                    <button
                      onClick={handleHumanize}
                      disabled={!text.trim()}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Humanize
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Text */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-medium mb-4">Your Text</h2>

                  <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="w-full h-full min-h-[350px] text-gray-900 whitespace-pre-wrap">{text}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{wordCount} / 250 words</div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleCheckAI}
                        disabled={!text.trim() || isCheckingAI}
                        className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
                      >
                        {isCheckingAI ? "Checking..." : "Check for AI"}
                      </button>

                      <button
                        onClick={handleHumanize}
                        disabled={!text.trim()}
                        className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Humanize</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Detection Result */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-medium mb-4">Result</h2>

                  <div className="min-h-[400px] flex items-center justify-center">
                    <AIDetectionResult overallPercentage={6} detectors={mockDetectors} isLoading={isCheckingAI} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
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
