/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `paymentStatus`,
    ADD COLUMN `accessUntil` DATETIME(3) NULL;
