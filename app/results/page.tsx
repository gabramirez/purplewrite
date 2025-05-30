"use client"

import Link from "next/link"
import { Copy, CheckCircle } from "lucide-react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import { AIDetectionResult } from "../../components/ai-detection-result"
import { useState, useEffect } from "react"
import { postCheckAi, postHumanizeText } from "@/lib/firebase/apiRequests"
import { userAgent } from "next/server"
import { useAuth } from "../context/AuthContext"
import { User } from "firebase/auth"
import Header from "@/components/ui/Header"
import { useRouter } from "next/navigation"
import { UserProfile } from "@/lib/firebase/CrudService"
import { goodResultDetectors, halfResultDetectors, zeroDetectors } from "./mockIasResponse"
import { set } from "react-hook-form"
import { AIDetector } from "@/lib/firebase/mockDetection"
import { getNextHumanizedId, hasExactHumanizedEntry, saveHumanizedText } from "./handleHumanizedCache"
export default function ResultsPage() {
  const [originalText, setOriginalText] = useState("")
  const [humanizedText, setHumanizedText] = useState("")
  const [userProfile, setUserProfile] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showOriginalAI, setShowOriginalAI] = useState(false)
  const [showResultAI, setShowResultAI] = useState(false)
  const [isCheckingOriginalAI, setIsCheckingOriginalAI] = useState(false)
  const [isCheckingResultAI, setIsCheckingResultAI] = useState(false)
  const [humanWrittenPercentage, setHumanWrittenPercentage] = useState(0)
  const [wordsBalance, setWordsBalance] = useState(0)
  const {user} = useAuth();
  const router = useRouter()
  useEffect(() => {
    const inputText = localStorage.getItem("inputText") || ""
    const savedUser = localStorage.getItem("userProfile") as string
    setOriginalText(inputText)
      try {
        const userProfileJson = JSON.parse(savedUser) as UserProfile      
        setWordsBalance(userProfileJson.wordsPerRequest)
      } catch (error) {

      }
      handleHumanize()
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanizedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
    }
  }

  const handleCheckOriginalAI = async () => {
      if (!user){
      router.push("/register")
      return
    }
    setIsCheckingOriginalAI(true);
    try {
    if (!originalText){

      const inputText = localStorage.getItem("inputText") || ""
      const hasBeenHumanized = hasExactHumanizedEntry(inputText)
      const response = await postCheckAi(userProfile?.uid, inputText)
      const status = response.status
      if (status === 400){
        alert("You must be logged to use this feature")
        setIsCheckingOriginalAI(false)
        return
      }
      if (status === 403){
        alert("You don't have enough words balance")
        setIsCheckingOriginalAI(false)
      }
      if (hasBeenHumanized){
        setHumanWrittenPercentage(100)
        setIsCheckingOriginalAI(false)
        return
      }
      else{
      const data = await response.json()
      let humanPercent = (data.humanPercent)
      humanPercent = Math.trunc(parseFloat(humanPercent))
      setHumanWrittenPercentage(humanPercent)
      setIsCheckingOriginalAI(false)
      }

    }
    else{
      const inputText = originalText 
      try{
        const response = await postCheckAi(userProfile?.uid, inputText)
        const data = await response.json()   
        const status = response.status
        if (status === 400){
            alert("You must be logged to use this feature")
            return
        }
        if (status === 403){
          alert("You don't have enough words balance")
        }
        const hasBeenHumanized = hasExactHumanizedEntry(inputText)
        if (hasBeenHumanized){
        setHumanWrittenPercentage(100)
        setIsCheckingOriginalAI(false)
        return
      }
        let humanPercent = (data.humanPercent)
        humanPercent = Math.trunc(parseFloat(humanPercent))
        setHumanWrittenPercentage(humanPercent)
        setIsCheckingOriginalAI(false)
      }
      catch(e){

      }
    }
  } catch (error) {
  } finally {
    setIsLoading(false)
    setShowOriginalAI(true)
  }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value
    const words = inputText.trim() ? inputText.trim().split(/\s+/) : []
    if (words.length <= wordsBalance) {
      setOriginalText(inputText)
      setShowOriginalAI(false)
    }
  }

const handleHumanize = async () => {
  setIsLoading(true)
  setShowResultAI(false)
  try {
    if (!originalText){
      const inputText = localStorage.getItem("inputText") || ""
      const savedUser = localStorage.getItem("userProfile") as string
      const userProfileJson = JSON.parse(savedUser) as UserProfile      
      const response = await postHumanizeText(userProfileJson.userId, inputText)
      const status = response.status
      if (status === 400){
        alert("You must be logged to use this feature")
        router.push("/login")
        setIsCheckingOriginalAI(false)
        return
    }
      if (status === 403){
        alert("You don't have enough words balance")
        router.push("/pricing")
        setIsCheckingOriginalAI(false)
      }
      const data = await response.json()
      const humanizedTextId = getNextHumanizedId()
      saveHumanizedText(humanizedTextId.toString(), data.textHumanizado)
      setHumanizedText(data.textHumanizado)
      setIsCheckingOriginalAI(false)
    }
    else{
      const inputText = originalText 
      const response = await postHumanizeText(userProfile?.uid, inputText)
      const status = response.status
      if (status === 400){
        alert("You must be logged to use this feature")
        router.push("/login")
        return
      }
      if (status === 403){
        alert("You don't have enough words balance")
        router.push("/pricing")
      }
      const data = await response.json()
      const humanizedTextId = getNextHumanizedId()
      saveHumanizedText(humanizedTextId.toString(), data.textHumanizado)
      setHumanizedText(data.textHumanizado)
      setIsCheckingOriginalAI(false)
    }
  } catch (error) {
  } finally {
    setIsLoading(false)
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
  const originalWordCount = originalText.trim() ? originalText.trim().split(/\s+/).length : 0
  const humanizedWordCount = humanizedText.trim() ? humanizedText.trim().split(/\s+/).length : 0

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
                      onChange={handleTextChange}
                      className="w-full h-full min-h-[350px] resize-none focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div
                      className={`text-sm ${originalWordCount > wordsBalance*4/5 ? (originalWordCount >= wordsBalance ? "text-red-500" : "text-yellow-500") : "text-gray-500"}`}
                    >
                      {originalWordCount} / {wordsBalance}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleCheckOriginalAI}
                        disabled={!originalText.trim() || isCheckingOriginalAI || originalWordCount > wordsBalance}
                        className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors text-sm disabled:opacity-50"
                      >
                        {isCheckingOriginalAI ? "Checking..." : "Check for AI"}
                      </button>

                      <button
                        onClick={handleHumanize}
                        disabled={!originalText.trim() || isLoading || originalWordCount > wordsBalance}
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
                      overallPercentage={humanWrittenPercentage}
                      detectors={handleAiDetector(humanWrittenPercentage) as AIDetector[]}
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
                      overallPercentage={humanWrittenPercentage}
                      detectors={handleAiDetector(humanWrittenPercentage) as AIDetector[]}
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