'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard after successful login
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <h1 className='text-4xl font-bold mb-8'>Log In</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500' required />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            required
          />
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none'>
          Log In
        </button>
      </form>
      <p className='mt-4'>
        Don&apos;t have an account?{' '}
        <Link href='/signup' className='text-blue-600 hover:underline'>
          Sign Up
        </Link>
      </p>
    </>
  );
}
