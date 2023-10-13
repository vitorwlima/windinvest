-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "highestWindFinalScore" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "userSubscriptions" ALTER COLUMN "updatedAt" DROP DEFAULT;
