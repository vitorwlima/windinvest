-- CreateTable
CREATE TABLE "userSubscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" TIMESTAMP(3),

    CONSTRAINT "userSubscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userSubscriptions_userId_key" ON "userSubscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscriptions_stripeCustomerId_key" ON "userSubscriptions"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "userSubscriptions_stripeSubscriptionId_key" ON "userSubscriptions"("stripeSubscriptionId");
