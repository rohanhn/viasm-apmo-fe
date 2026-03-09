import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-textPrimary text-white">
      <div className="max-w-6xl mx-auto sm:px-6 sm:py-16 px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8 sm:mb-12 mb-6">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src="/assets/images/apmo/logo_vn_transparent_white.png"
                alt="APMO Logo"
                width={120}
                height={40}
                className="rounded"
                style={{ height: "auto" }}
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              The Asian Pacific Mathematics Olympiad promotes mathematical
              excellence and fosters international cooperation among young
              mathematicians across the Asia-Pacific region.
            </p>
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="sm"
                className="w-10 h-10 !p-0 rounded-full"
              >
                <span className="text-sm">📧</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-10 h-10 !p-0 rounded-full"
              >
                <span className="text-sm">🌐</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  About APMO
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Competition Rules
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Past Problems
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Training Materials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Statistics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-primary-300 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 sm:pt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm max-sm:text-center">
            © {currentYear} Asian Pacific Mathematics Olympiad. All rights
            reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-300 text-sm transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-300 text-sm transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
