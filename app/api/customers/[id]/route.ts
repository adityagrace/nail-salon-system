// app/api/customers/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from "@/prisma";



//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

// Fungsi DELETE (sudah ada)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }

) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    await prisma.customer.delete({
      where: { id: customerId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Error deleting customer', { status: 500 });
  }
}

// FUNGSI BARU untuk menangani permintaan PUT (update)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Mengambil data baru dari body request
    const body = await request.json();
    const { nama, no_wa, email, tgl_lahir, catatan } = body;

    // Menggunakan Prisma untuk mengupdate data pelanggan
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        nama,
        no_wa,
        email,
        tgl_lahir,
        catatan,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return new NextResponse('Error updating customer', { status: 500 });
  }
}