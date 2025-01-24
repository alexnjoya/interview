import React, { useState } from "react";
import Toast from "./Toast";

interface BirdData {
  _id: string;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string[];
  appearance: {
    size: string;
    color: string[];
  };
  photos: string[];
}

const BirdTable: React.FC<{
  birds: BirdData[];
  onDelete: (id: string) => void;
  onEdit: (bird: BirdData) => void;
}> = ({ birds, onDelete, onEdit }) => {
  const [selectedBird, setSelectedBird] = useState<BirdData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [birdToDelete, setBirdToDelete] = useState<string | null>(null);

  const handleViewDetails = (bird: BirdData) => {
    setSelectedBird(bird);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBird(null);
    setIsModalOpen(false);
  };

  const toggleActions = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleDeleteClick = (id: string) => {
    setBirdToDelete(id);
    setShowToast(true);
  };

  const confirmDelete = () => {
    if (birdToDelete) {
      onDelete(birdToDelete);
    }
    setShowToast(false);
    setBirdToDelete(null);
  };

  const cancelDelete = () => {
    setShowToast(false);
    setBirdToDelete(null);
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left text-gray-700">
              Common Name
            </th>
            <th className="border px-4 py-2 text-left text-gray-700">
              Scientific Name
            </th>
            <th className="border px-4 py-2 text-left text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {birds.map((bird) => (
            <tr key={bird._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-gray-800">
                {bird.commonName}
              </td>
              <td className="border px-4 py-2 text-gray-800">
                {bird.scientificName}
              </td>
              <td className="border px-4 py-2 text-gray-800">
                <div className="relative flex items-center justify-center">
                  <button
                    className=" text-gray-700 p-2 rounded-full md:hidden"
                    onClick={() => toggleActions(bird._id)}
                  >
                    &#x22EE;
                  </button>
                  {expandedRow === bird._id && (
                    <div className="absolute z-10 bg-white border rounded shadow-lg top-10 right-0 w-40">
                      <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                        onClick={() => handleDeleteClick(bird._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                        onClick={() => handleViewDetails(bird)}
                      >
                        Details
                      </button>
                    </div>
                  )}
                  <div className="hidden md:flex space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDeleteClick(bird._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => handleViewDetails(bird)}
                    >
                      Details
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() => onEdit(bird)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Bird Details */}
      {isModalOpen && selectedBird && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bird Details
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>Common Name:</strong> {selectedBird.commonName}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Scientific Name:</strong> {selectedBird.scientificName}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Description:</strong> {selectedBird.description}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Habitat:</strong> {selectedBird.habitat.join(", ")}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Appearance:</strong> Size: {selectedBird.appearance.size},
              Color: {selectedBird.appearance.color.join(", ")}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Photos:</strong>
              <ul>
                {selectedBird.photos.map((photo, idx) => (
                  <li key={idx} className="text-blue-500 hover:underline">
                    <a href={photo} target="_blank" rel="noopener noreferrer">
                      View Photo {idx + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => onEdit(selectedBird)}
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Are you sure you want to delete this bird?"
          onClose={() => setShowToast(false)} // Close the toast without any action
          onConfirmDelete={confirmDelete} // Confirm the delete action
          type="error" // Error type for the delete confirmation
        />
      )}
    </div>
  );
};

export default BirdTable;
