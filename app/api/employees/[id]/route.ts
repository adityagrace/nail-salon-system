// app/api/employees/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from "@/prisma";



//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }

) {
  try {
    const { id } = await params;
    const employeeId = parseInt(id);

    if (isNaN(employeeId)) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    await prisma.employee.delete({
      where: { id: employeeId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Error deleting employee', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const employeeId = parseInt(id);

    if (isNaN(employeeId)) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const body = await request.json();
    const { 
      nama, 
      jabatan, 
      gajiPokok, 
      status,
      agama,
      tglLahir,
      pendidikanTerakhir,
      alamat,
      keterangan,
      statusPernikahan
    } = body;

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        nama,
        jabatan,
        gajiPokok,
        status,
        agama,
        tglLahir: tglLahir ? new Date(tglLahir) : null,
        pendidikanTerakhir,
        alamat,
        keterangan,
        statusPernikahan,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    return new NextResponse('Error updating employee', { status: 500 });
  }
}