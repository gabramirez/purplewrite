import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { PurpleWriteLogo } from "../purple-write-logo";
import Image from "next/image";
export default function Header (){
    const{user, logOut } = useAuth();
    return(
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

              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
            {user ? (
            <Link href="/profile">
              <Image
                width={96}
                height={96}
                src={user.photoURL || '/default-avatar.svg'}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-gray-300 hover:opacity-90 transition"
              />
            </Link>
          ) : (
            <>
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
            </>
          )}
            </div>
          </div>
        </div>
    </header>
    )
}