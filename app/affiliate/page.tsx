import Link from "next/link"
import Image from "next/image"
import { DollarSign, Video, Eye, Heart } from "lucide-react"
import { PurpleWriteLogo } from "../../components/purple-write-logo"

export default function AffiliatePage() {
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
              <Link href="/affiliate" className="text-gray-900 font-medium hover:text-gray-900">
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
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Earn with us</h1>
            <p className="text-xl text-gray-600 mb-2">Get Paid to Talk About Purple Write</p>
            <p className="text-gray-600">
              Turn your views into real earnings with our <span className="font-medium">Influencer Program</span>!
            </p>
          </div>

          {/* Earn Up to $15,000 Section */}
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  <Video className="h-8 w-8 text-gray-700 mr-3" />
                  <h2 className="text-2xl font-bold">Earn Up to $15,000 per Video</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-700">
                    Get <span className="text-primary font-medium">$1.50 for every 1,000 real views</span>
                  </p>
                  <p className="text-gray-700">
                    Minimum payout: <span className="text-primary font-medium">$15 for 10,000 views</span>
                  </p>
                  <p className="text-gray-700">No cap: the more you grow, the more you earn!</p>
                </div>

                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-colors self-start">
                  Join the Program
                </button>
              </div>

              <div className="md:w-1/2 relative">
                <Image
                  src="/social-media-metrics-phone.png"
                  alt="Influencer checking social media metrics"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />

                {/* Overlay metrics */}
                <div className="absolute top-1/4 right-8 space-y-3">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center shadow-md">
                    <Eye className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">10,000</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center shadow-md">
                    <Heart className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">8,145</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center shadow-md">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">15,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-medium mb-2">Sign Up</h3>
                <p className="text-gray-600">Join our influencer program by filling out a simple form</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-medium mb-2">Create Content</h3>
                <p className="text-gray-600">Make videos or posts about Purple Write</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-medium mb-2">Get Paid</h3>
                <p className="text-gray-600">Earn money based on your content's performance</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">How do I join the program?</h3>
                <p className="text-gray-600">
                  Click the "Join the Program" button and fill out the application form. Our team will review your
                  application and get back to you within 48 hours.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">When do I get paid?</h3>
                <p className="text-gray-600">
                  Payments are processed on the 1st of every month for the previous month's earnings, as long as you've
                  reached the minimum payout threshold of $15.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">What type of content should I create?</h3>
                <p className="text-gray-600">
                  You can create tutorials, reviews, or demonstrations of Purple Write. We'll provide you with
                  guidelines and resources to help you create effective content.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-gray-600 mb-6">Join our influencer program today and turn your audience into income!</p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-colors">
              Join the Program
            </button>
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
