import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
        <header className='w-full py-6 bg-blue-600 text-white text-center'>
          <h1 className='text-4xl font-bold'>Player Shifts Manager</h1>
        </header>
        <main className='flex flex-col items-center justify-center flex-1 px-4 py-8 text-center'>{children}</main>
        <footer className='w-full py-4 bg-gray-800 text-white text-center'>
          <p>&copy; 2023 Player Shifts Management. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
