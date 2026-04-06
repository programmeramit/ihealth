/*
  Warnings:

  - You are about to drop the column `ipdId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `opdId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `IPD` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OPD` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('OPD', 'IPD');

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_ipdId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_opdId_fkey";

-- DropIndex
DROP INDEX "Appointment_doctorId_key";

-- DropIndex
DROP INDEX "Appointment_patientId_key";

-- AlterTable
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "ipdId",
DROP COLUMN "opdId",
ADD COLUMN     "type" "VisitType" NOT NULL;

-- DropTable
DROP TABLE "IPD";

-- DropTable
DROP TABLE "OPD";
