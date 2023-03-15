// lib/models/Player.js
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  stats: {
    acorns: {
      type: Number,
      default: 10,
    },
    science: {
      type: Number,
      default: 0,
    },
    warfare: {
      type: Number,
      default: 0,
    },
    alignment: {
      econ: {
        type: Number,
        default: 0,
      },
      dipl: {
        type: Number,
        default: 0,
      },
      govt: {
        type: Number,
        default: 0,
      },
      scty: {
        type: Number,
        default: 0,
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);
export default player;
