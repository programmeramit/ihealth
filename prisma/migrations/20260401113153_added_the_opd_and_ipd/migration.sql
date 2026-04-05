-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "ipdId" TEXT,
ADD COLUMN     "opdId" TEXT;

-- CreateTable
CREATE TABLE "OPD" (
    "id" TEXT NOT NULL,

    CONSTRAINT "OPD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPD" (
    "id" TEXT NOT NULL,

    CONSTRAINT "IPD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_ipdId_fkey" FOREIGN KEY ("ipdId") REFERENCES "IPD"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_opdId_fkey" FOREIGN KEY ("opdId") REFERENCES "OPD"("id") ON DELETE SET NULL ON UPDATE CASCADE;
