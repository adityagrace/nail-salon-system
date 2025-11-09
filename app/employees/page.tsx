// app/employees/page.tsx

'use client';

import { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList'; // Impor komponen tabel karyawan
import EmployeeModal from './EmployeeModal'; // Impor komponen modal karyawan
import { Employee } from './EmployeeList'; // Impor interface Employee

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // API endpoint untuk karyawan
      const response = await fetch(`/api/employees?page=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
      const result = await response.json();
      
      setEmployees(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmployeeData: Omit<Employee, 'id' | 'tglMasuk' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeData),
      });
      setCurrentPage(1);
      fetchEmployees();
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data karyawan ini?');
    if (!confirmDelete) return;

    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = async (id: number, updatedData: Omit<Employee, 'id' | 'tglMasuk' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Karyawan</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Tambah Karyawan
        </button>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari berdasarkan nama..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 lg:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Memuat data...</span>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow">
            <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-700">
              Menampilkan {employees.length} dari {totalCount} total karyawan
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
        }}
        onAddEmployee={handleAddEmployee}
        onEditEmployee={handleUpdateEmployee}
        employee={editingEmployee}
      />
    </div>
  );
}