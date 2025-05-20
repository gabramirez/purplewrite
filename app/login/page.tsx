"use client"
import Link from "next/link"
import { GoogleIcon } from "../../components/google-icons"
import { PurpleWriteLogo } from "../../components/purple-write-logo"
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { handleRegisterWithGoogle } from "@/lib/firebase/AuthHandler";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const router = useRouter()
  const auth = getAuth()
  const recoverPassword = async () => {
    await sendPasswordResetEmail(auth, email).then(() => {
      console.log("email enviado")
    })
  }
  
    const handleLoginWithGoogle = async () => {
    if (!email) {
      return alert("Email is required.");
    }

    if (!password) {
      return alert("Password is required.");
    }

    try {
      handleRegisterWithGoogle(signInWithGoogle)
      router.push('/');
    } catch (error: any) {    
      alert("Failed to login. Please check your credentials.");
    }
  };
  



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
                className="bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
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
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-gray-600">Log in to your Purple Write account</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            {/* Social Login */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-6"
              onClick={handleLoginWithGoogle}
            >
              <GoogleIcon className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleLoginWithGoogle}>
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
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="#" className="text-sm text-primary hover:underline" onClick={recoverPassword}>
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground mt-6 py-2.5 rounded-md hover:opacity-90 transition-colors"
              >
                Log in
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        {/* ... (sem mudanças no footer) */}
      </footer>
    </div>
  );
}
