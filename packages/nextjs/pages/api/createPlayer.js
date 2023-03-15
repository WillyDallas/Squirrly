import connectMongo from "../../lib/mongoConnect";
import Player from "../../lib/models/Player";

export default async function createPlayer(req, res) {
  try {
    await connectMongo();
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
