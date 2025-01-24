import express, { Router } from "express";
import {
  getAllBirds,
  createBird,
  getBirdById,
  updateBird,
  deleteBird,
} from "../controllers/bird";

const router: Router = express.Router();

router.get("/birds", getAllBirds); // Get all birds
router.post("/birds", createBird); // Create a new bird
router.get("/birds/:id", getBirdById); // Get details of one bird by ID
router.put("/birds/:id", updateBird); // Update a bird by ID
router.delete("/birds/:id", deleteBird); // Delete a bird by ID

export default router;
