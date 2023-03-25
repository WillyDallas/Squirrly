import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  ideologicalImpact: {
    econ: Number,
    dipl: Number,
    govt: Number,
    scty: Number,
  },
});

const stageSchema = new mongoose.Schema({
  stageTitle: {
    type: String,
    required: true,
  },
  stageDescription: {
    type: String,
    required: true,
  },
  choices: [choiceSchema],
});

const questSchema = new mongoose.Schema({
  questTitle: {
    type: String,
    required: true,
  },
  questGiver: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  questStages: [stageSchema],
});

const Quest = mongoose.model("Quest", questSchema);

export default Quest;
