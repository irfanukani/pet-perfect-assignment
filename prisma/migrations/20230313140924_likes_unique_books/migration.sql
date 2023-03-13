/*
  Warnings:

  - A unique constraint covering the columns `[bookId,authorId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Likes_bookId_authorId_key" ON "Likes"("bookId", "authorId");
