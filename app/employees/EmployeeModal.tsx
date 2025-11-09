// app/employees/EmployeeModal.tsx

'use client';

import { useState, useEffect } from 'react';
import { Employee } from './EmployeeList'; // Impor interface dari EmployeeList

// Interface untuk data karyawan baru (tanpa id, createdAt, updatedAt)
interface NewEmployeeData {
  nama: string;
  jabatan: string;
  gajiPokok: number;
  agama: string;
  tglLahir: string;
  pendidikanTerakhir: string;
  alamat: string;
  keterangan: string;
  statusPernikahan: string;
}

export default function EmployeeModal({ 
  isOpen, 
  onClose, 
  onAddEmployee, 
  onEditEmployee, 
  employee,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (employee: NewEmployeeData) => void;
  onEditEmployee: (id: number, employee: NewEmployeeData) => void;
  employee: Employee | null;
}) {
  // Inisialisasi state dengan semua field yang dibutuhkan
  const [formData, setFormData] = useState<NewEmployeeData>({
    nama: '',
    jabatan: '',
    gajiPokok: 0,
    agama: '',
    tglLahir: '',
    pendidikanTerakhir: '',
    alamat: '',
    keterangan: '',
    statusPernikahan: '',
  });

  // useEffect untuk mengisi form jika ada data karyawan (mode edit)
  useEffect(() => {
    if (employee) {
      setFormData({
        nama: employee.nama,
        jabatan: employee.jabatan,
        gajiPokok: employee.gajiPokok,
        agama: employee.agama || '',
        tglLahir: employee.tglLahir ? new Date(employee.tglLahir).toISOString().split('T')[0] : '',
        pendidikanTerakhir: employee.pendidikanTerakhir || '',
        alamat: employee.alamat || '',
        keterangan: employee.keterangan || '',
        statusPernikahan: employee.statusPernikahan || '',
      });
    } else {
      // Kosongkan form untuk mode tambah
      setFormData({
        nama: '',
        jabatan: '',
        gajiPokok: 0,
        agama: '',
        tglLahir: '',
        pendidikanTerakhir: '',
        alamat: '',
        keterangan: '',
        statusPernikahan: '',
      });
    }
  }, [employee, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      onEditEmployee(employee.id, formData);
    } else {
      onAddEmployee(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {employee ? 'Edit Data Karyawan' : 'Tambah Data Karyawan Baru'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid untuk membuat form 2 kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">Nama Lengkap</label>
              <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jabatan">Jabatan</label>
              <input type="text" id="jabatan" name="jabatan" value={formData.jabatan} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gajiPokok">Gaji Pokok</label>
              <input type="number" id="gajiPokok" name="gajiPokok" value={formData.gajiPokok} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agama">Agama</label>
              <input type="text" id="agama" name="agama" value={formData.agama} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tglLahir">Tanggal Lahir</label>
              <input type="date" id="tglLahir" name="tglLahir" value={formData.tglLahir} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusPernikahan">Status Pernikahan</label>
              <select id="statusPernikahan" name="statusPernikahan" value={formData.statusPernikahan} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">-- Pilih --</option>
                <option value="Single">Single</option>
                <option value="Sudah Menikah">Sudah Menikah</option>
                <option value="Pernah Menikah">Pernah Menikah</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikanTerakhir">Pendidikan Terakhir</label>
              <input type="text" id="pendidikanTerakhir" name="pendidikanTerakhir" value={formData.pendidikanTerakhir} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keterangan">Keterangan</label>
              <input type="text" id="keterangan" name="keterangan" value={formData.keterangan} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          {/* Alamat menggunakan lebar penuh */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat Domisili</label>
            <textarea id="alamat" name="alamat" value={formData.alamat} onChange={handleChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Batal
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {employee ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}