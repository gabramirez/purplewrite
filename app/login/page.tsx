"use client"
import Link from "next/link"
import { GoogleIcon } from "../../components/google-icons"
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { handleRegisterWithGoogle } from "@/lib/firebase/AuthHandler";
import Header from "@/components/ui/Header";
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const router = useRouter()
    const handleLoginWithGoogle = async () => {
    try {
      await handleRegisterWithGoogle(signInWithGoogle)
      router.push('/');
    } catch (error: any) {    
      alert("Failed to login. Please check your credentials.");
    }
  };




  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <Header/>

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
      </footer>
    </div>
  );
}
