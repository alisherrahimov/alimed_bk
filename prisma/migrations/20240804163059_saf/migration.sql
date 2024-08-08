-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_image_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
