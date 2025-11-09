// app/customers/CustomerModal.tsx

'use client';

import { useState, useEffect } from 'react'; // Tambahkan useEffect
import { Customer } from './page';

// Interface untuk data pelanggan baru
interface NewCustomerData {
  nama: string;
  no_wa: string;
  email: string;
  tgl_lahir: string;
  catatan: string;
}

// Komponen ini sekarang menerima 'customer' untuk mode edit
export default function CustomerModal({ 
  isOpen, 
  onClose, 
  onAddCustomer, 
  onEditCustomer, // Fungsi baru untuk edit
  customer, // Data pelanggan yang akan diedit (bisa null)
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (customer: NewCustomerData) => void;
  onEditCustomer: (id: number, customer: NewCustomerData) => void;
  customer: Customer | null; // Bisa null (mode tambah) atau ada isinya (mode edit)
}) {
  const [formData, setFormData] = useState<NewCustomerData>({
    nama: '',
    no_wa: '',
    email: '',
    tgl_lahir: '',
    catatan: '',
  });

  // Gunakan useEffect untuk mengisi form jika ada data pelanggan (mode edit)
  useEffect(() => {
    if (customer) {
      // Jika 'customer' ada, isi form dengan datanya
      setFormData({
        nama: customer.nama,
        no_wa: customer.no_wa,
        email: customer.email,
        tgl_lahir: customer.tgl_lahir,
        catatan: customer.catatan || '', // Pastikan catatan tidak undefined
      });
    } else {
      // Jika tidak ada, kosongkan form (mode tambah)
      setFormData({
        nama: '',
        no_wa: '',
        email: '',
        tgl_lahir: '',
        catatan: '',
      });
    }
  }, [customer, isOpen]); // Efek ini berjalan jika 'customer' atau 'isOpen' berubah

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer) {
      // Jika 'customer' ada, ini mode edit
      onEditCustomer(customer.id, formData);
    } else {
      // Jika tidak ada, ini mode tambah
      onAddCustomer(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Judul modal berubah dinamis */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {customer ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Form fields tetap sama, tidak ada perubahan */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">Nama</label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no_wa">No. WA</label>
            <input type="tel" id="no_wa" name="no_wa" value={formData.no_wa} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tgl_lahir">Tanggal Lahir</label>
            <input type="date" id="tgl_lahir" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="catatan">Catatan</label>
            <textarea id="catatan" name="catatan" value={formData.catatan} onChange={handleChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
            {/* Teks tombol juga berubah dinamis */}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {customer ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}