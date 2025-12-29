/*
  Warnings:

  - You are about to alter the column `department` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `department` ENUM('SCIENCE', 'ARTS', 'COMMERCIAL') NOT NULL DEFAULT 'SCIENCE',
    MODIFY `programme` ENUM('WAEC', 'NECO', 'GCE', 'UTME', 'POST_UTME', 'JUPEB') NOT NULL DEFAULT 'UTME';
