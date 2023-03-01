import { NFTStorage, File } from "nft.storage";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;
const arg = process.argv[2];
const name = process.argv[3];

async function storeAsset(path, img) {
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store({
    name: `${name.slice(0, -4)})}`,
    description: "This is a squirrel",
    image: new File([await fs.promises.readFile(`${path}`)], `${img}`, { type: "image/png" }),
  });
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
  console.log("image stored on IPFS with CID:", metadata.image);
}

storeAsset(arg, name)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
