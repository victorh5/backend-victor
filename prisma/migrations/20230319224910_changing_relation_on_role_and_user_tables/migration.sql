/*
  Warnings:

  - You are about to drop the column `userId` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,roleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_userId_fkey";

-- DropIndex
DROP INDEX "role_userId_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "role" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_roleId_key" ON "users"("email", "roleId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
