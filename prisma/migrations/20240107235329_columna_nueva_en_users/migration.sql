/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_key" ON "users"("user_name");
