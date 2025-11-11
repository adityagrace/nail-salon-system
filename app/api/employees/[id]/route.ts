// app/api/employees/[id]/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma";

// DELETE EMPLOYEE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = parseInt(params.id);

    if (isNaN(employeeId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.employee.delete({
      where: { id: employeeId },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("DELETE employee error:", error);
    return NextResponse.json(
      { error: "Error deleting employee" },
      { status: 500 }
    );
  }
}

// UPDATE EMPLOYEE
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = parseInt(params.id);

    if (isNaN(employeeId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        ...body,
        tglLahir: body.tglLahir ? new Date(body.tglLahir) : null,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("PUT employee error:", error);
    return NextResponse.json(
      { error: "Error updating employee" },
      { status: 500 }
    );
  }
}
