// app/employees/EmployeeList.tsx

'use client';
import React, { useState } from 'react';
import { Employee } from './EmployeeList';

export default function EmployeeList({ 
  employees, 
  onEdit, 
  onDelete 
}: { 
  employees: Employee[]; 
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const handleToggleExpand = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-800">
          <tr>
            {/* Kolom Nomor Urut */}
            <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              No
            </th>
            {/* Kolom untuk Tombol Expand */}
            <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              &nbsp; {/* Spasi kosong untuk header tombol */}
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Nama</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Jabatan</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Gaji Pokok</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Tanggal Masuk</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">Status</th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {employees.map((employee, index) => (
            <React.Fragment key={employee.id}>
              <tr className={index % 2 === 0 ? 'bg-white hover:bg-yellow-200' : 'bg-gray-50 hover:bg-yellow-200'}>
                {/* Sel untuk Nomor Urut */}
                <td className="py-4 px-4 text-sm font-medium text-gray-900 border-r border-gray-300 text-center">
                  {index + 1}
                </td>
                {/* Sel untuk Tombol Expand */}
                <td className="py-4 px-2 text-sm font-medium text-gray-900 border-r border-gray-300 text-center">
                  <button
                    onClick={() => handleToggleExpand(employee.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${expandedRowId === employee.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-black border-r border-gray-300">{employee.nama}</td>
                <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">{employee.jabatan}</td>
                <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(employee.gajiPokok)}</td>
                <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">{new Date(employee.tglMasuk).toLocaleDateString('id-ID')}</td>
                <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    employee.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-medium space-x-2">
                  <button onClick={() => onEdit(employee)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDelete(employee.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>

              {/* Baris Detail yang Muncul Secara Kondisional */}
              {expandedRowId === employee.id && (
                <tr>
                  {/* Perbarui colSpan menjadi 8, karena sekarang ada 8 kolom */}
                  <td colSpan={8} className="px-6 py-4 bg-gray-50 border-b">
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Agama:</strong> {employee.agama || '-'}</p>
                      <p><strong>Tanggal Lahir:</strong> {employee.tglLahir ? new Date(employee.tglLahir).toLocaleDateString('id-ID') : '-'}</p>
                      <p><strong>Status Pernikahan:</strong> {employee.statusPernikahan || '-'}</p>
                      <p><strong>Pendidikan Terakhir:</strong> {employee.pendidikanTerakhir || '-'}</p>
                      <p><strong>Alamat:</strong> {employee.alamat || '-'}</p>
                      <p><strong>Keterangan:</strong> {employee.keterangan || '-'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}