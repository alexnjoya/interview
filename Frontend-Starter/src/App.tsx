import { useState, useEffect } from "react";
import {
  fetchBirds,
  createBird,
  updateBird,
  deleteBird,
} from "./services/services"; // Importing the birdService functions
import BirdTable from "./components/BirdTable";
import Modal from "./components/BirdModal";
import { Bird } from "./utils/types"; // Assuming the Bird type is placed in a types file

const Home = () => {
  const [birds, setBirds] = useState<Bird[]>([]); // All birds
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>([]); // Birds filtered by search
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [currentBird, setCurrentBird] = useState<Bird | null>(null); // Bird being edited

  // Fetch birds from API
  useEffect(() => {
    fetchBirds()
      .then((data) => {
        setBirds(data);
        setFilteredBirds(data); // Initialize filtered birds with full list
      })
      .catch((error) => console.error("Error fetching birds:", error));
  }, []);

  // Create bird
  const handleCreateBird = (birdData: Omit<Bird, "_id">) => {
    createBird(birdData)
      .then((newBird) => {
        setBirds((prev) => [...prev, newBird]);
        setFilteredBirds((prev) => [...prev, newBird]);
        setShowModal(false);
      })
      .catch((error) => console.error("Error creating bird:", error));
  };

  // Update bird
  const handleUpdateBird = (id: string, updatedData: Omit<Bird, "_id">) => {
    updateBird(id, updatedData)
      .then((updatedBird) => {
        const updatedBirds = birds.map((bird) =>
          bird._id === id ? updatedBird : bird
        );
        setBirds(updatedBirds);
        setFilteredBirds(updatedBirds);
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating bird:", error));
  };

  // Delete bird
  const handleDeleteBird = (id: string) => {
    deleteBird(id)
      .then(() => {
        const updatedBirds = birds.filter((bird) => bird._id !== id);
        setBirds(updatedBirds);
        setFilteredBirds(updatedBirds);
      })
      .catch((error) => console.error("Error deleting bird:", error));
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = birds.filter(
      (bird) =>
        bird.commonName.toLowerCase().includes(lowerCaseQuery) ||
        bird.scientificName.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBirds(filtered);
  };

  // Open modal for editing
  const handleEditBird = (bird: Bird) => {
    setCurrentBird(bird);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" ml-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => {
            setCurrentBird(null); // Reset current bird when creating a new one
            setShowModal(true);
          }}
        >
          Create Bird
        </button>

        <div className="w-full  mr-4 sm:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a bird..."
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* BirdTable Component */}
      <BirdTable
        birds={filteredBirds} // Pass filtered birds to BirdTable
        onDelete={handleDeleteBird} // Pass delete handler
        onEdit={handleEditBird} // Pass edit handler
      />

      {/* Modal for creating/editing a bird */}
      {showModal && (
        <Modal
          title={currentBird ? "Edit Bird" : "Create Bird"}
          birdData={currentBird} // Pass current bird's data to the modal
          onClose={() => setShowModal(false)} // Close modal handler
          onSubmit={
            (data) =>
              currentBird
                ? handleUpdateBird(currentBird._id, data) // Update if editing
                : handleCreateBird(data) // Create if new bird
          }
        />
      )}
    </div>
  );
};

export default Home;
