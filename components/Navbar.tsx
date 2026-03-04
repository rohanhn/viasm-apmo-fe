'use client';

/* eslint-disable prettier/prettier */
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "./Button";

export default function Navbar() {
  const pathname = usePathname();
  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/countries', label: 'Countries' },
    { href: '/problems', label: 'Problems' },
    { href: '/results', label: 'Results' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/assets/images/apmo/logo_vn.jpg"
              alt="APMO Logo"
              width={120}
              height={40}
              className="rounded"
            />
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
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
