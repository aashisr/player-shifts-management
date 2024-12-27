'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (err) {
                console.log('Error is ', err);
                setError('Failed to fetch user data. Please log in again.');
                localStorage.removeItem('token');
                router.push('/login');
            }
        };

        fetchUser();
    }, [router]);

    if (error) {
        return <p className='text-red-500'>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 className='text-4xl font-bold mb-8'>Dashboard</h1>
            <p className='text-lg mb-8'>Welcome, {user.name}!</p>
            <p className='text-lg mb-8'>Your role: {user.role}</p>
        </>
    );
}
