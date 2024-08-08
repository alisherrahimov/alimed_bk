/*
  Warnings:

  - You are about to drop the column `receiverType` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderType` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_image_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "receiverUser";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "senderUser";

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "image_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverType",
DROP COLUMN "senderType";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
