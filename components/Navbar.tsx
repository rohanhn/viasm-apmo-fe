/* eslint-disable prettier/prettier */
import Link from "next/link";
import Image from "next/image";

import Button from "./Button";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/assets/images/apmo/apmologo.gif"
              alt="APMO Logo"
              width={120}
              height={40}
              className="rounded"
            />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <nav className="hidden md:flex gap-8 text-textSecondary">
            <Link href="/about" className="hover:text-primary-500 transition">
              About
            </Link>
            <Link href="#" className="hover:text-primary-500 transition">
              Countries
            </Link>
            <Link href="#" className="hover:text-primary-500 transition">
              Results
            </Link>
            <Link href="#" className="hover:text-primary-500 transition">
              Reports
            </Link>
          </nav>

          <Button
            variant="primary"
            size="lg"
            className="px-6 py-2 text-sm shadow-sm hover:shadow-md"
          >
            Follow Us
          </Button>
        </div>
      </div>
    </header>
  );
}
