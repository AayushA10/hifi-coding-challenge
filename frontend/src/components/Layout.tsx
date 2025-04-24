import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <Link href="/" className="font-bold text-xl">
            Help Desk
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:underline">
              Submit Ticket
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-gray-600">Help Desk System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;