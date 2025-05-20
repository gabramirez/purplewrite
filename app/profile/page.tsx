"use client"

import Link from "next/link"
import { LogOut, CreditCard, Clock } from "lucide-react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { findUserByUserId } from "@/lib/firebase/CrudService"
import { UserProfile } from "@/lib/firebase/CrudService"
import Header from "@/components/ui/Header"
import { useRouter } from "next/navigation"
export default function ProfilePage() {
  const [profileLoading, setProfileLoading] = useState(true)
  const { user, logOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const router = useRouter()
useEffect(() => {
  if (!user) {
    setUserProfile(null);
    return;
  }

  const fetchUserProfile = async () => {
    setProfileLoading(true);


    const profile = await findUserByUserId(user.uid);

    if (profile) {
      setUserProfile(profile);
    }

    setProfileLoading(false);

  };

  fetchUserProfile();
}, [user])
  return (      
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h2 className="text-xl font-medium">Account</h2>
              </div>
              <Link href="/login" className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium" onClick={async (e) => {
      e.preventDefault(); // Impede o redirecionamento automático do <Link>
      await logOut();     // Executa o logout
      router.push("/login"); // Redireciona após logout
    }}>
                <LogOut className="h-4 w-4 mr-1" />
                Log out
              </Link>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-gray-900">{user?.displayName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Balance and Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-medium">Balance</h2>
              </div>

              {profileLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Available Words</p>
                    <p className="text-2xl font-medium text-primary">{userProfile?.wordsBalance}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Subscription Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Clock className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-medium">Subscription</h2>
              </div>

              {profileLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                    <p className="text-gray-900 font-medium">{userProfile?.subscription}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Renewal Date</p>
                    <p className="text-gray-900">June 15, 2025</p>
                  </div>

                </div>
              )}
            </div>
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
