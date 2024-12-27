import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { FaUserCircle } from 'react-icons/fa'; // Importing an icon from react-icons

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className='w-full py-6 bg-blue-600 text-white flex justify-between items-center px-8'>
          <div className='flex-1 flex justify-center'>
            <h1 className='text-4xl font-bold'>Player Shifts Manager</h1>
          </div>
          <div className='flex items-center'>
            <FaUserCircle className='text-3xl mr-2' /> {/* User icon */}
            <div>
              <p className='text-lg'>Welcome, user.name!</p>
              <p className='text-lg'>Your role: user.role</p>
            </div>
          </div>
        </header>
        <main className='flex flex-col items-center justify-center flex-1 px-4 py-8 text-center'>{children}</main>
        <footer className='w-full py-4 bg-gray-800 text-white text-center'>
          <p>&copy; 2023 Player Shifts Management. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
