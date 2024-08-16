-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT,
    "entryName" TEXT,
    "entryEmail" TEXT,
    "productName" TEXT,
    "orderAmount" INTEGER,
    "receiptUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
