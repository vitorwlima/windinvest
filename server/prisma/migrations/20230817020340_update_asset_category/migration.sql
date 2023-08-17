/*
  Warnings:

  - Changed the type of `category` on the `assets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "assets" DROP COLUMN "category",
ADD COLUMN     "category" "AssetCategory" NOT NULL;
