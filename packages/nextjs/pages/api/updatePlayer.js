import mongoConnect from "../../lib/mongoConnect";
import Player from "../../lib/models/Player";

export default async function updatePlayer(req, res) {
  try {
    await mongoConnect();
    const { walletAddress } = req.body;
    const player = await Player.findOne({ walletAddress });
    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return;
    }
    // Assign new values to the player object
    Object.keys(req.body).forEach(key => {
      if (key === "stats") {
        Object.keys(req.body.stats).forEach(subKey => {
          if (subKey === "alignment") {
            Object.keys(req.body.stats.alignment).forEach(subSubKey => {
              player.stats.alignment[subSubKey] = req.body.stats.alignment[subSubKey];
            });
          } else {
            player.stats[subKey] = req.body.stats[subKey];
          }
        });
      } else if (key !== "walletAddress") {
        player[key] = req.body[key];
      }
    });
    player.updatedAt = Date.now();
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
