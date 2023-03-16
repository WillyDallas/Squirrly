import mongoConnect from "../../lib/mongoConnect";
import Player from "../../lib/models/Player";

export default async function updatePlayer(req, res) {
  try {
    await mongoConnect();
    const player = Player.create(req.body);
    player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}