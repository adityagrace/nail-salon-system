// app/layout.tsx

import './globals.css';
import MainLayout from './components/MainLayout'; // Impor komponen MainLayout kita

export const metadata = {
  title: 'Nail Salon System',
  description: 'Sistem manajemen untuk nail art salon',
};

// Kita juga tambahkan tipe untuk children di sini
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}