import fs from "fs";
import { parse } from "csv-parse";
import { prisma } from "db";
import { AssetType, AssetCategory } from "@prisma/client";

fs.createReadStream("./src/scripts/stocks_list.csv")
  .pipe(parse({ delimiter: "," }))
  .on("data", async (row) => {
    const assetType = row[1].includes("4") ? AssetType.PN : row[1].includes("11") ? AssetType.UNIT : AssetType.ON
    const asset = {
      code: row[1],
      fantasy_name: row[2],
      company_name: row[3],
      cnpj: row[4],
      category: AssetCategory.stock,
      type: assetType
    }
    console.log(asset)
    
    await prisma.asset.create({
      data: asset
    })
  });
