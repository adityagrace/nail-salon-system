-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "no_wa" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tgl_lahir" TEXT,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
