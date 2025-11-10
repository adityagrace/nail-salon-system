// app/customers/CustomerList.tsx

import { Customer } from './page';

export default function CustomerList({ 
  customers, 
  onEdit, 
  onDelete 
}: { 
  customers: Customer[]; 
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-800">
          <tr>
            {/* Kolom Nomor Urut Baru */}
            <th className="py-3 px-4 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              No
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              Nama
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              No. WA
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              Email
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              Tanggal Lahir
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              Tanggal Register
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-300">
              Catatan
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {customers.map((customer, index) => (
            <tr key={customer.id} className={index % 2 === 0 ? 'bg-white hover:bg-yellow-200' : 'bg-gray-50 hover:bg-yellow-200'}>
              {/* Sel Nomor Urut Baru */}
              <td className="py-4 px-4 text-sm font-medium text-gray-900 border-r border-gray-300 text-center">
                {index + 1}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-black border-r border-gray-300">
                {customer.nama}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">
                {customer.no_wa}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">
                {customer.email}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">
                {customer.tgl_lahir}
              </td>
                   
              <td className="py-4 px-6 text-sm text-gray-900 border-r border-gray-300">
                {new Date(customer.createdAt).toLocaleDateString("id-ID")}

              </td>
              <td className="py-4 px-6 text-sm text-gray-600 border-r border-gray-300">
                {customer.catatan}
              </td>
              <td className="py-4 px-6 text-sm font-medium space-x-2">
                <button onClick={() => onEdit(customer)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => onDelete(customer.id)} className="text-red-600 hover:text-red-900">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}