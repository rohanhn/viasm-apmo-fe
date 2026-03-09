/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */

'use client';

/* eslint-disable prettier/prettier */
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";

import Button from "./Button";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/countries', label: 'Countries' },
    { href: '/problems', label: 'Problems' },
    { href: '/results', label: 'Results' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto sm:px-6 px-2 h-20 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/assets/images/apmo/logo_vn.jpg"
              alt="APMO Logo"
              width={120}
              height={40}
              className="rounded"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-textSecondary">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "hover:text-primary-500 transition",
                  {
                    'text-primary-500': pathname === item.href,
                  }
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Button
            variant="primary"
            size="lg"
            className="hidden md:block px-6 py-2 text-sm shadow-sm hover:shadow-md"
          >
            Follow Us
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay Background */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 md:hidden">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-100">
              <Image
                src="/assets/images/apmo/logo_vn.jpg"
                alt="APMO Logo"
                width={100}
                height={33}
                className="rounded"
                style={{ height: "auto" }}
              />
              <button
                className="p-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Content */}
            <div className="flex flex-col h-full">
              <nav className="flex-1 px-4">
                <div className="">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={classNames(
                        "block py-2 rounded-lg text-base font-medium transition-colors",
                        {
                          'bg-primary-50 text-primary-500 ': pathname === item.href,
                          'text-textSecondary hover:bg-gray-50 hover:text-primary-500': pathname !== item.href,
                        }
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
              
              {/* Menu Footer */}
              <div className="p-6 border-t border-gray-100">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full px-6 py-3 text-base shadow-sm hover:shadow-md"
                >
                  Follow Us
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}