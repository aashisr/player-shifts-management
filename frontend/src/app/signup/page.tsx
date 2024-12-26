"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('player');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
                name,
                email,
                password_hash: password,
                role
            });

            if (response.status === 201) {
                setSuccess('User created successfully!');
            }
        } catch (err) {
			console.log("Error is ", err);
            setError('Failed to create user. Please try again.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1 className='text-4xl font-bold mb-8'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                {success && <p className='text-green-500 mb-4'>{success}</p>}
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                        required
                    />
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
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='role'>
                        Role
                    </label>
                    <select id='role' value={role} onChange={(e) => setRole(e.target.value)} className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'>
                        <option value='player'>Player</option>
                        <option value='coach'>Coach</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none'>
                    Sign Up
                </button>
            </form>
            <p className='mt-4'>
                Already have an account?{' '}
                <Link href='/login' className='text-blue-600 hover:underline'>
                    Log In
                </Link>
            </p>
        </div>
    );
}
