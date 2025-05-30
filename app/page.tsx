"use client"
import Link from "next/link"
import { ClipboardIcon } from "lucide-react"
import { useAuth } from "./context/AuthContext";
import Image from "next/image";
import Header from "@/components/ui/Header";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/firebase/apiRequests";
import { AIDetectionResult } from "../components/ai-detection-result"
import { useRouter } from "next/navigation"
import { postCheckAi } from "@/lib/firebase/apiRequests";
import { AIDetector, generateDetectorResults } from "@/lib/firebase/mockDetection";
import { zeroDetectors, goodResultDetectors, halfResultDetectors} from "./results/mockIasResponse";
export default function Home() {
  interface UserProfile {
  subscription: string;
  subscriptionId: string;
  userId: string;
  wordsPerRequest:number;
  wordsBalance: number;
}
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [detectorResults, setDetectorResults] = useState<AIDetector[]>([])
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.uid) return;
      try {
        const res = await getUserProfile(user.uid)
        if (!res.ok) {

          return;
        }

        const data: UserProfile = await res.json();
        setUserProfile(data);
      } catch (error) {

      }
    };

    fetchUserProfile();
  }, [user?.uid]);
  const wordsBalance = userProfile?.wordsPerRequest ?? 250
  const [text, setText] = useState("")
  const [showAIDetection, setShowAIDetection] = useState(false)
  const [isCheckingAI, setIsCheckingAI] = useState(false)
  const router = useRouter()
  const [humanWrittenPercentage, setHumanWrittenPercentage] = useState(0)
  
  const handleHumanize = () => {
    if (!user){
      router.push("/register")
    }
    if (text.trim()) {
      localStorage.setItem("inputText", text)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("userProfile", JSON.stringify(userProfile))
      router.push("/results")
    }
  }

  const handleAiDetector = (percentage:number) => {
      if (percentage <= 20){
        return zeroDetectors
      }
      if (percentage > 20 && percentage <= 70 ){
        return halfResultDetectors
      }
      if (percentage > 70){
        return goodResultDetectors
      }
    }


  const handleCheckAI = async () => {
    if (!user){
      router.push("/register")
    }
    if (!text.trim()) return
    setIsCheckingAI(true)
    setShowAIDetection(true)
    const response = await postCheckAi(user!.uid, text)

    const status = response.status
    if (status === 400){
      alert("You must be logged to use this feature")
      setIsCheckingAI(false)
      return
    }
    if (status === 403){
      alert("You don't have enough words balance")
      router.push("/pricing")
      setIsCheckingAI(false)   
      return
    }
    const data = await response.json()
    let humanPercent = (data.humanPercent)
    humanPercent = Math.trunc(parseFloat(humanPercent))
    setDetectorResults(generateDetectorResults(humanPercent))
    setHumanWrittenPercentage(humanPercent)
    setIsCheckingAI(false)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value
    const words = inputText.trim() ? inputText.trim().split(/\s+/) : []
    if (words.length <= wordsBalance) {
      setText(inputText)
      setShowAIDetection(false)
    }
  }   

  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      const words = clipboardText.trim() ? clipboardText.trim().split(/\s+/) : []
      if (words.length <= wordsBalance) {
        setText(clipboardText)
        setShowAIDetection(false)
      } else {
        const truncatedWords = words.slice(0, wordsBalance)
        const truncatedText = truncatedWords.join(" ")
        setText(truncatedText)
        setShowAIDetection(false)
      }
    } catch (err) {
    }
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header/>
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
            {!user ? ( <Link
              href="/register"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-colors font-medium inline-block"
            >
              Try for free
            </Link>) : <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-colors font-medium" onClick={() => {router.push("/pricing")}}>
              Get more words
            </button> }
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
                    onChange={handleTextChange}
                    className="w-full h-full min-h-[250px] resize-none focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div
                    className={`text-sm ${wordCount > wordsBalance*4/5 ? (wordCount >= wordsBalance ? "text-red-500" : "text-yellow-500") : "text-gray-500"}`}
                  >
                    {wordCount} / {wordsBalance} words
                  </div>

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
                      disabled={!text.trim() || wordCount > wordsBalance}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Check for AI
                    </button>

                    <button
                      onClick={handleHumanize}
                      disabled={!text.trim() || wordCount > wordsBalance}
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
                  <textarea
                    value={text}
                    onChange={handleTextChange}
                    className="w-full h-full min-h-[350px] resize-none focus:outline-none"
                  />
                </div>

                  <div className="flex justify-between items-center">
                    <div
                      className={`text-sm ${wordCount > wordsBalance * 4 / 5 ? (wordCount >= wordsBalance ? "text-red-500" : "text-yellow-500") : "text-gray-500"}`}
                    >
                      {wordCount} / {wordsBalance} words
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleCheckAI}
                        disabled={!text.trim() || isCheckingAI || wordCount > wordsBalance}
                        className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
                      >
                        {isCheckingAI ? "Checking..." : "Check for AI"}
                      </button>

                      <button
                        onClick={handleHumanize}
                        disabled={!text.trim() || wordCount > wordsBalance}
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
                    <AIDetectionResult overallPercentage={humanWrittenPercentage} detectors={handleAiDetector(humanWrittenPercentage) as AIDetector[]} isLoading={isCheckingAI} />
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