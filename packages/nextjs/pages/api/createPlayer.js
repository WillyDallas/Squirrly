import mongoConnect from "../../lib/mongoConnect";
import Player from "../../lib/models/Player";

export default async function createPlayer(req, res) {
  try {
    await mongoConnect();
    const player = await Player.create(req.body);
    await player.save();
    console.log(player);
    res.status(201).json(player);
  } catch (err) {
    console.log(err.message);
  }
}
