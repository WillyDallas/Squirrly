import { NextApiRequest, NextApiResponse } from "next";

const checkNFTOwnership = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const walletAddress = req.body.walletAddress
    const contractAddress = req.body.contractAddress
    console.log('made it to api')
    const options = { method: "GET", headers: { accept: "application/json" } };
    const apiKey = process.env.ALCHEMI_API_KEY;
    const url = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/isHolderOfCollection?wallet=${walletAddress}&contractAddress=${contractAddress}`
    await fetch(
      url,
      options,
    )
      //.then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
};

export default checkNFTOwnership
