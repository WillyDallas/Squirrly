import mongoConnect from "../../lib/mongoConnect";
import Player from "../../lib/models/Player";

export default async function getPlayerinfo(req, res) {
  try {
    await mongoConnect();
    const { walletAddress } = req.body;
    const player = await Player.findOne({ walletAddress });
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
