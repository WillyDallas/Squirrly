// lib/models/Player.js
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  stats: {
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
    alignment: {
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
    },
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);
export default Player;
