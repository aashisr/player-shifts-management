'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User, Shift, Player } from '../../interfaces';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newShift, setNewShift] = useState<{ start_time: string; end_time: string; court: string }>({
    start_time: '',
    end_time: '',
    court: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get<User>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (err) {
        console.log('fetchUser Error is ', err);
        setError('Failed to fetch user data. Please log in again.');
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    const fetchShifts = async () => {
      try {
        const response = await axios.get<Shift[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shifts`);
        setShifts(response.data);
      } catch (err) {
        console.log('fetchShifts Error is ', err);
        setError('Failed to fetch shifts.');
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await axios.get<Player[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`);
        setPlayers(response.data);
      } catch (err) {
        console.log('fetchPlayers Error is ', err);
        setError('Failed to fetch players.');
      }
    };

    fetchUser();
    fetchShifts();
    fetchPlayers();
  }, [router]);

  const handleAddShift = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post<Shift>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shifts`, newShift, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShifts([...shifts, response.data]);
      setNewShift({ start_time: '', end_time: '', court: '' });
    } catch (err) {
      console.log('Error is ', err);
      setError('Failed to add shift.');
    }
  };

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full p-8'>
      <div className='col-span-1'>
        <h2 className='text-2xl font-semibold mb-4'>Add New Shift</h2>
        <form onSubmit={handleAddShift} className='mb-8 w-full'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='start_time'>
              Start Time
            </label>
            <input
              type='datetime-local'
              id='start_time'
              value={newShift.start_time}
              onChange={(e) => setNewShift({ ...newShift, start_time: e.target.value })}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='end_time'>
              End Time
            </label>
            <input
              type='datetime-local'
              id='end_time'
              value={newShift.end_time}
              onChange={(e) => setNewShift({ ...newShift, end_time: e.target.value })}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='court'>
              Court
            </label>
            <input
              type='text'
              id='court'
              value={newShift.court}
              onChange={(e) => setNewShift({ ...newShift, court: e.target.value })}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none'>
            Add Shift
          </button>
        </form>
      </div>

      <div className='col-span-1'>
        <h2 className='text-2xl font-semibold mb-4'>Upcoming Shifts</h2>
        <ul className='mb-8 w-full'>
          {shifts.map((shift) => (
            <li key={shift.id} className='mb-4'>
              <p className='text-lg'>
                {shift.start_time} - {shift.end_time} at {shift.court}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className='col-span-1'>
        <h2 className='text-2xl font-semibold mb-4'>Players</h2>
        <ul className='w-full'>
          {players.map((player) => (
            <li key={player.id} className='mb-4'>
              <p className='text-lg'>{player.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
