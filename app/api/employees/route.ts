// app/api/employees/route.ts

import { NextResponse } from 'next/server';
import { Prisma, prisma } from '@prisma/client'; // <--- Tambahkan Prisma dari @prisma/client
import { Prisma } from '../../../prisma'; // <--- HAPUS BARIS INI, JIKA ADA



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '5');
    const searchTerm = searchParams.get('searchTerm') || '';

    const skip = (page - 1) * pageSize;

    const where = searchTerm
      ? {
          nama: {
            contains: searchTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [employees, totalCount] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy: { tglMasuk: 'desc' },
        skip: skip,
        take: pageSize,
      }),
      prisma.employee.count({ where }),
    ]);

    return NextResponse.json({
      data: employees,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    return new NextResponse('Error fetching employees', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nama, 
      jabatan, 
      gajiPokok,
      agama,
      tglLahir,
      pendidikanTerakhir,
      alamat,
      keterangan,
      statusPernikahan
    } = body;

    const newEmployee = await prisma.employee.create({
      data: {
        nama,
        jabatan,
        gajiPokok,
        agama,
        tglLahir: tglLahir ? new Date(tglLahir) : null,
        pendidikanTerakhir,
        alamat,
        keterangan,
        statusPernikahan,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    return new NextResponse('Error adding employee', { status: 500 });
  }
}