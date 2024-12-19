-- CreateTable
CREATE TABLE "User" (
    "_id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "firstName" STRING DEFAULT '',
    "lastName" STRING DEFAULT '',
    "imageUrl" STRING DEFAULT '',
    "clerkUserId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
