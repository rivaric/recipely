/*
  Warnings:

  - You are about to drop the column `instructions` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "instructions";

-- CreateTable
CREATE TABLE "Instruction" (
    "id" SERIAL NOT NULL,
    "step_number" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dishId" INTEGER,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
