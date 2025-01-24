import axios from "axios";
import { Bird } from "../utils/types"; 

const API_URL = "http://localhost:5000/api/birds";

// Fetch all birds
export const fetchBirds = async (): Promise<Bird[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching birds:", error);
    throw error;
  }
};

// Create a bird
export const createBird = async (birdData: Omit<Bird, "_id">): Promise<Bird> => {
  try {
    const response = await axios.post(API_URL, birdData);
    return response.data;
  } catch (error) {
    console.error("Error creating bird:", error);
    throw error;
  }
};

// Update a bird
export const updateBird = async (
  id: string,
  updatedData: Omit<Bird, "_id">
): Promise<Bird> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating bird:", error);
    throw error;
  }
};

// Delete a bird
export const deleteBird = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting bird:", error);
    throw error;
  }
};
