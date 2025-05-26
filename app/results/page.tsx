"use client"

import Link from "next/link"
import { Copy, CheckCircle } from "lucide-react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import { AIDetectionResult } from "../../components/ai-detection-result"
import { useState, useEffect } from "react"

export default function ResultsPage() {
  const [originalText, setOriginalText] = useState("")
  const [humanizedText, setHumanizedText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showOriginalAI, setShowOriginalAI] = useState(false)
  const [showResultAI, setShowResultAI] = useState(false)
  const [isCheckingOriginalAI, setIsCheckingOriginalAI] = useState(false)
  const [isCheckingResultAI, setIsCheckingResultAI] = useState(false)

  useEffect(() => {
    const inputText = localStorage.getItem("inputText") || ""
    setOriginalText(inputText)

    setTimeout(() => {
      const humanized = simulateHumanization(inputText)
      setHumanizedText(humanized)
      setIsLoading(false)
    }, 2000)
  }, [])

  const simulateHumanization = (text: string) => {
    return text
      .replace(/AI/g, "artificial intelligence")
      .replace(/\bthe\b/g, "a")
      .replace(/\bis\b/g, "becomes")
      .replace(/\bwill\b/g, "shall")
      .replace(/\bcan\b/g, "may")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanizedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleCheckOriginalAI = () => {
    if (!originalText.trim()) return
    setIsCheckingOriginalAI(true)
    setShowOriginalAI(true)
    setTimeout(() => setIsCheckingOriginalAI(false), 3000)
  }

  const handleCheckResultAI = () => {
    if (!humanizedText.trim()) return
    setIsCheckingResultAI(true)
    setShowResultAI(true)
    setTimeout(() => setIsCheckingResultAI(false), 3000)
  }

  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setOriginalText(clipboardText)
      setShowOriginalAI(false)
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err)
    }
  }

  const handleHumanize = () => {
    setIsLoading(true)
    setShowResultAI(false)
    setTimeout(() => {
      const humanized = simulateHumanization(originalText)
      setHumanizedText(humanized)
      setIsLoading(false)
    }, 2000)
  }

  const originalWordCount = originalText.trim() ? originalText.trim().split(/\s+/).length : 0
  const humanizedWordCount = humanizedText.trim() ? humanizedText.trim().split(/\s+/).length : 0

  // Mock AI detection data
  const originalDetectors = [
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

  const resultDetectors = [
    { name: "Turnitin", status: "passed" as const },
    { name: "GPTZero", status: "passed" as const },
    { name: "OpenAI", status: "passed" as const },
    { name: "Writer", status: "passed" as const },
    { name: "CrossPlag", status: "passed" as const },
    { name: "CopyLeaks", status: "passed" as const },
    { name: "Sapling", status: "passed" as const },
    { name: "Originality", status: "passed" as const },
    { name: "ZeroGPT", status: "passed" as const },
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
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-colors font-medium">
              Get more words
            </button>
          </div>
        </section>

        {/* Results Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Text */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium mb-4">Your Text</h2>

              {!showOriginalAI ? (
                <>
                  <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 mb-4">
                    <textarea
                      placeholder="Paste your text here..."
                      value={originalText}
                      onChange={(e) => setOriginalText(e.target.value)}
                      className="w-full h-full min-h-[350px] resize-none focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{originalWordCount} / 250 words</div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleCheckOriginalAI}
                        disabled={!originalText.trim() || isCheckingOriginalAI}
                        className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
                      >
                        {isCheckingOriginalAI ? "Checking..." : "Check for AI"}
                      </button>

                      <button
                        onClick={handleHumanize}
                        disabled={!originalText.trim() || isLoading}
                        className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{isLoading ? "Humanizing..." : "Humanize"}</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="min-h-[400px] flex items-center justify-center">
                    <AIDetectionResult
                      overallPercentage={6}
                      detectors={originalDetectors}
                      isLoading={isCheckingOriginalAI}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{originalWordCount} words</div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowOriginalAI(false)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Back to text
                      </button>

                      <button
                        onClick={handleHumanize}
                        disabled={!originalText.trim() || isLoading}
                        className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{isLoading ? "Humanizing..." : "Humanize"}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Humanized Result */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Result</h2>
                {!isLoading && humanizedText && !showResultAI && (
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    100% human written
                  </div>
                )}
              </div>

              {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Humanizing your text...</p>
                  </div>
                </div>
              ) : showResultAI ? (
                <>
                  <div className="min-h-[400px] flex items-center justify-center">
                    <AIDetectionResult
                      overallPercentage={98}
                      detectors={resultDetectors}
                      isLoading={isCheckingResultAI}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{humanizedWordCount} words</div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowResultAI(false)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Back to text
                      </button>

                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="w-full h-full min-h-[350px] text-gray-900 whitespace-pre-wrap">
                      {humanizedText || "Your humanized text will appear here..."}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{humanizedWordCount} words</div>

                    <div className="flex space-x-3">
                      {humanizedText && (
                        <button
                          onClick={handleCheckResultAI}
                          disabled={isCheckingResultAI}
                          className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
                        >
                          {isCheckingResultAI ? "Checking..." : "Check for AI"}
                        </button>
                      )}

                      {humanizedText && (
                        <button
                          onClick={handleCopy}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
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
