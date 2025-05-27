"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { useState } from "react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import Header from "@/components/ui/Header"
import { useAuth } from "../context/AuthContext"
import { postCheckoutSession } from "@/lib/firebase/apiRequests"
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const {user} = useAuth();
  const pricingPlans = {
    monthly: [
      {
        name: "Basic",
        price: "$6.99",
        discountedPrice: null,
        wordsPerMonth: "5,000",
        wordsPerRequest: "500",
        priceId: "price_1RQwmsQ96ai7WSnx5gl8SkOC",
        features: [
          "500 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Basic Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "20 languages supported",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "$19.99",
        priceId: "price_1RQwnaQ96ai7WSnxIMZAuxin",
        discountedPrice: null,
        wordsPerMonth: "15,000",
        wordsPerRequest: "1,500",
        features: [
          "1,500 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Advanced Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "50+ languages supported",
          "Advanced Turnitin Bypass Engine",
          "Human-like results",
          "Unlimited grammar checks",
          "Fast mode",
        ],
        popular: true,
      },
      {
        name: "Ultra",
        price: "$39.99",
        discountedPrice: null,
        wordsPerMonth: "30,000",
        wordsPerRequest: "3,000",
        priceId: "price_1RQwoMQ96ai7WSnxzsDQn4xc",
        features: [
          "3,000 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Advanced Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "50+ languages supported",
          "Advanced Turnitin Bypass Engine",
          "Human-like results",
          "Unlimited grammar checks",
          "Fast mode",
          "Ultra-human writing output",
          "Priority support",
        ],
        popular: false,
      },
    ],
    annual: [
      {
        name: "Basic",
        price: "$6.99",
        priceId: "price_1RQwmsQ96ai7WSnx5gl8SkOC",
        discountedPrice: "$4.99",
        wordsPerMonth: "5,000",
        wordsPerRequest: "500",
        features: [
          "500 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Basic Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "20 languages supported",
        ],
        popular: false,
      },
      {
        name: "Pro",
        price: "$19.99",
        priceId: "price_1RQwmsQ96ai7WSnx5gl8SkOC",
        discountedPrice: "$13.99",
        wordsPerMonth: "15,000",
        wordsPerRequest: "1,500",
        features: [
          "1,500 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Advanced Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "50+ languages supported",
          "Advanced Turnitin Bypass Engine",
          "Human-like results",
          "Unlimited grammar checks",
          "Fast mode",
        ],
        popular: true,
      },
      {
        name: "Ultra",
        price: "$39.99",
        priceId: "price_1RQwmsQ96ai7WSnx5gl8SkOC",
        discountedPrice: "$27.99",
        wordsPerMonth: "30,000",
        wordsPerRequest: "3,000",
        features: [
          "3,000 words per request",
          "Bypass all AI detectors (incl. Turnitin & GPTZero)",
          "Advanced Humanization Engine",
          "Plagiarism-free",
          "Error-free rewriting",
          "Undetectable results",
          "Unlimited AI detection",
          "50+ languages supported",
          "Advanced Turnitin Bypass Engine",
          "Human-like results",
          "Unlimited grammar checks",
          "Fast mode",
          "Ultra-human writing output",
          "Priority support",
        ],
        popular: false,
      },
    ],
  }

  const currentPlans = isAnnual ? pricingPlans.annual : pricingPlans.monthly

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Flexible pricing plans for you</h1>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-md p-1 border border-gray-200">
              <button
                className={`px-6 py-2 rounded-md ${
                  !isAnnual ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-md ${
                  isAnnual ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual <span className="text-primary text-sm">(Save 30%)</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg ${
                  plan.popular ? "border-2 border-primary" : "border border-gray-200"
                } p-6 flex flex-col relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-6 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-primary mb-4">{plan.wordsPerMonth} words per month</p>
                <div className="flex items-baseline mb-6">
                  {plan.discountedPrice ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">{plan.price}</span>
                      <span className="text-4xl font-bold">{plan.discountedPrice}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  )}
                  <div className="ml-2 flex flex-col">
                    <span className="text-sm text-gray-500">Per month</span>
                    {isAnnual && <span className="text-sm text-gray-500">Billed annually</span>}
                  </div>
                </div>

                <button className="bg-primary text-primary-foreground py-3 rounded-md hover:opacity-90 transition-colors mb-6" onClick={() => {
                  postCheckoutSession(plan.priceId, user?.uid)
                }}>
                  Subscribe
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Us */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Need more?{" "}
              <Link href="#" className="text-primary hover:underline">
                Contact Us
              </Link>
            </p>
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
