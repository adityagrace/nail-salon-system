import Link from "next/link";

export default function Sidebar(){
    return(
        <aside className="w-64 bg-slate-800 text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        {/* Logo atau Judul Aplikasi */}
        <h1 className="text-2xl font-bold text-center">Nail Salon</h1>
      </div>
      
      {/* Daftar Menu Navigasi */}
      <nav className="mt-6">
        <Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          📊 Dashboard
        </Link>
        <Link href="/customers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          👥 Pelanggan
        </Link>
        <Link href="/employees" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          👨‍💼 Karyawan
        </Link>
        <Link href="/services" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          💅 Layanan
        </Link>
        <Link href="/bookings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          📅 Booking
        </Link>
        <Link href="/transactions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          💸 Transaksi
        </Link>
        <Link href="/inventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          📦 Inventory
        </Link>
        <Link href="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700">
          📈 Laporan
        </Link>
      </nav>
    </aside>
    );
}