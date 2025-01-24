import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const birdSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  habitat: [{ type: String, required: true }],
  appearance: {
    size: { type: String, required: true },
    color: [{ type: String, required: true }],
  },
  photos: [{ type: String, required: true }],
});

export const Bird = mongoose.model("Bird", birdSchema);
