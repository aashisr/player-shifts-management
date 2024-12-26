"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">Player Shifts Manager</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8 text-center">
        <Image
          src="/logo.svg"
          alt="Player Shifts Manager Logo"
          width={150}
          height={150}
          className="mb-8"
        />
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Manage your player shifts effortlessly
        </h2>
        <p className="text-lg mb-8">
          Our application helps you manage player shifts, track attendance, and
          organize teams efficiently.
        </p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
          </Link>
          <Link href="/login" className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Log In
          </Link>
        </div>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2023 Player Shifts Management. All rights reserved.</p>
      </footer>
    </div>
  );
}