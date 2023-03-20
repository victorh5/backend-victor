-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- DropIndex
DROP INDEX "role_id_key";

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
