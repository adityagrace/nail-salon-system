// app/api/customers/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma'; // BENAR // Path relatif ke file prisma.ts



// app/api/customers/route.ts

// ... (import dan PrismaClient tidak berubah)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '5');
    // Ambil parameter pencarian dari URL
    const searchTerm = searchParams.get('searchTerm') || '';

    const skip = (page - 1) * pageSize;

    // Buat kondisi 'where' untuk Prisma
    // Jika ada searchTerm, filter berdasarkan nama. Jika tidak, jangan filter apa-apa.
    const where = searchTerm
      ? {
          nama: {
            contains: searchTerm,
            mode: 'Prisma.QueryMode.insensitive', // Membuat pencarian tidak case-sensitive (huruf besar/kecil sama)
          },
        }
      : {};

    // Jalankan query dengan kondisi 'where'
    const [customers, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where, // Terapkan filter
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: pageSize,
      }),
      prisma.customer.count({ where }), // Hitung total data yang sudah difilter
    ]);

    return NextResponse.json({
      data: customers,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    return new NextResponse('Error fetching customers', { status: 500 });
  }
}

// ... (fungsi POST, PUT, DELETE tidak berubah)

// Fungsi POST tidak berubah
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, no_wa, email, tgl_lahir, catatan } = body;

    const newCustomer = await prisma.customer.create({
      data: { nama, no_wa, email, tgl_lahir, catatan },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return new NextResponse('Error adding customer', { status: 500 });
  }
}