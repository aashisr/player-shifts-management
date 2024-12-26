'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Image src='/logo.svg' alt='Player Shifts Manager Logo' width={150} height={150} className='mb-8' />
      <h2 className='text-2xl font-semibold mb-4 text-gray-900'>Manage your player shifts effortlessly</h2>
      <p className='text-lg mb-8'>Our application helps you manage player shifts, track attendance, and organize teams efficiently.</p>
      <div className='flex gap-4'>
        <Link href='/signup' className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
          Sign Up
        </Link>
        <Link href='/login' className='px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700'>
          Log In
        </Link>
      </div>
    </>
  );
}
