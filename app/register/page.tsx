"use client"
import Link from "next/link"
import { GoogleIcon } from "../../components/google-icons"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import React, { useState } from "react"
import { getAuth ,createUserWithEmailAndPassword, User, UserCredential, EmailAuthCredential } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { db,auth} from "@/lib/firebase/firebase"
import {doc, setDoc } from "firebase/firestore"
import { handleRegisterWithGoogle, handleEmailRegister} from "@/lib/firebase/AuthHandler"
import Header from "@/components/ui/Header"

export default function RegisterPage() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const auth = getAuth();   
  
  const handleGoogleClick = async () => {
    await handleRegisterWithGoogle(signInWithGoogle)
    router.push('/');
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Email is required");
    if (password.length < 8) return alert("Password must be at least 8 characters long.");
    await handleEmailRegister(auth, email, password)
    router.push('/');
  }



  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600">Start humanizing your AI content today</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-6"
            onClick={handleGoogleClick}
            >
              <GoogleIcon className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email Registration Form */}


            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
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
