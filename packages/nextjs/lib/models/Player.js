// lib/models/Player.js
import mongoose from "mongoose";
import { string } from "yup";

/*
What info needs to be tracked about a player?
  Political Ideology
  Stats
  Items
    Owned
    Equipped
  Profile Info
  Quest Info
    Taken

*/

//Alignment Schema
const AlignmentSchema = new mongoose.Schema({
  econ: {
    type: Number,
    default: 0,
    min: -100,
    max: 100,
  },
  dipl: {
    type: Number,
    default: 0,
    min: -100,
    max: 100,
  },
  govt: {
    type: Number,
    default: 0,
    min: -100,
    max: 100,
  },
  scty: {
    type: Number,
    default: 0,
    min: -100,
    max: 100,
  },
});

//Stat Schema
const StatSchema = new mongoose.Schema({
  acorns: {
    type: Number,
    default: 10,
    min: 0,
  },
  science: {
    type: Number,
    default: 0,
    min: 0,
  },
  warfare: {
    type: Number,
    default: 0,
    min: 0,
  },
  civics: {
    type: number,
    default: 0,
    min: 0,
  },
});

//Player State Schema
const PlayerStateSchema = new mongoose.Schema({
  activity: {
    type: String,
    default: "foraging",
  },
  techProgress: {
    type: Number,
    default: 0,
  },
});

//Inventory Schema

//Item Schema

//Player Quest Schema

//Profile Info Schema

//Player Schema
const PlayerSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  state: PlayerStateSchema,
  stats: StatSchema,
  alignment: AlignmentSchema,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

PlayerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);
export default Player;
