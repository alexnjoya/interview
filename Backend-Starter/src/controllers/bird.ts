import { Request, Response } from "express";
import { Bird } from "../models/bird";

/**
 * Get all birds
 */
export const getAllBirds = async (req: Request, res: Response): Promise<void> => {
  try {
    const birds = await Bird.find();
    res.status(200).json(birds);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving birds", error });
  }
};

/**
 * Create a new bird
 */
export const createBird = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request body:", req.body);
    const bird = new Bird(req.body);
    await bird.save();
    res.status(201).json(bird);
  } catch (error) {
    console.error("Error creating bird:", error);
    res.status(400).json({ message: "Error creating bird", error });
  }
};

/**
 * Get details of one bird by ID
 */
export const getBirdById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) {
      res.status(404).json({ message: "Bird not found" });
      return;
    }
    res.status(200).json(bird);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bird", error });
  }
};

/**
 * Update a bird by ID
 */
export const updateBird = async (req: Request, res: Response): Promise<void> => {
  try {
    const bird = await Bird.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bird) {
      res.status(404).json({ message: "Bird not found" });
      return;
    }
    res.status(200).json(bird);
  } catch (error) {
    res.status(400).json({ message: "Error updating bird", error });
  }
};

/**
 * Delete a bird by ID
 */
export const deleteBird = async (req: Request, res: Response): Promise<void> => {
  try {
    const bird = await Bird.findByIdAndDelete(req.params.id);
    if (!bird) {
      res.status(404).json({ message: "Bird not found" });
      return;
    }
    res.status(200).json({ message: "Bird deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bird", error });
  }
};
