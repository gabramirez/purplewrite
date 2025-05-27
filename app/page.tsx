"use client"
import Link from "next/link"
import { ClipboardIcon } from "lucide-react"
import { useAuth } from "./context/AuthContext";
import Image from "next/image";
import Header from "@/components/ui/Header";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/firebase/apiRequests";
export default function Home() {
  interface UserProfile {
  subscription: string;
  subscriptionId: string;
  userId: string;
  wordsBalance: number;
}
  const { user} = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
useEffect(() => {
  const fetchUserProfile = async () => {
    if (!user?.uid) return;
    try {
      const res = await getUserProfile(user.uid)
      if (!res.ok) {
        console.error("Erro ao buscar perfil:", res.statusText);
        return;
      }

      const data: UserProfile = await res.json();
      console.log(data)
      setUserProfile(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  fetchUserProfile();
}, [user?.uid]);

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-50">

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
            </Link>) : ("")}
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
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
                <button className="flex items-center space-x-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors">
                  <ClipboardIcon className="w-4 h-4" />
                  <span>Paste Text</span>
                </button>

                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  Check for AI
                </button>

                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-colors">
                  Humanize
                </button>
              </div>
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
