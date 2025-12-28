/*
  Warnings:

  - You are about to alter the column `paymentStatus` on the `user` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `paymentStatus` ENUM('OWING', 'PAID') NOT NULL DEFAULT 'OWING';
