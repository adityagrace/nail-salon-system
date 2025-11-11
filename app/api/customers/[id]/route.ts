// app/api/customers/[id]/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma";

// DELETE CUSTOMER
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);

    if (isNaN(customerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.customer.delete({
      where: { id: customerId },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("DELETE customer error:", error);
    return NextResponse.json(
      { error: "Error deleting customer" },
      { status: 500 }
    );
  }
}

// UPDATE CUSTOMER
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);

    if (isNaN(customerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("PUT customer error:", error);
    return NextResponse.json(
      { error: "Error updating customer" },
      { status: 500 }
    );
  }
}
