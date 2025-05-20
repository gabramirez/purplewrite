"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import { ArrowLeft, CheckCircle } from "lucide-react"
<<<<<<< HEAD
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
export default function ForgotPasswordPage() {
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const recoverPassword = async () => {
    await sendPasswordResetEmail(auth, email).then(() => {
      })
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    recoverPassword()
      setIsSubmitted(true)
      setIsLoading(false)
=======

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1500)
>>>>>>> 9c911ae2bc8d380c73822ae70de8a8d9af2ded31
  }

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
            <nav className="flex items-center space-x-6">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-gray-600">
              {!isSubmitted
                ? "Enter your email address and we'll send you instructions to reset your password."
                : "Check your email for instructions to reset your password."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground mt-6 py-2.5 rounded-md hover:opacity-90 transition-colors disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Reset password"}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  If you don't see the email, check your spam folder or make sure you entered the correct email address.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  Try another email
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-primary hover:text-primary-dark font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </Link>
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
