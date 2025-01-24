import { useState, useEffect } from "react";

interface BirdData {
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

const Modal: React.FC<{
  title: string;
  onClose: () => void;
  onSubmit: (birdData: BirdData) => void;
  birdData: BirdData | null;
}> = ({ title, onClose, onSubmit, birdData }) => {
  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    description: "",
    habitat: "",
    size: "",
    color: "",
    photos: "",
  });

  // Update form fields if birdData is provided (edit mode)
  useEffect(() => {
    if (birdData) {
      setFormData({
        commonName: birdData.commonName,
        scientificName: birdData.scientificName,
        description: birdData.description,
        habitat: birdData.habitat.join(", "),
        size: birdData.appearance.size,
        color: birdData.appearance.color.join(", "),
        photos: birdData.photos.join(", "),
      });
    }
  }, [birdData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const birdData: BirdData = {
      commonName: formData.commonName,
      scientificName: formData.scientificName,
      description: formData.description,
      habitat: formData.habitat.split(",").map((h) => h.trim()),
      appearance: {
        size: formData.size,
        color: formData.color.split(",").map((c) => c.trim()),
      },
      photos: formData.photos.split(",").map((p) => p.trim()),
    };

    onSubmit(birdData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-4">
        <h2 id="modal-title" className="text-xl sm:text-2xl font-bold mb-4 text-center">
          {title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Common Name"
              className="border p-3 rounded w-full"
              value={formData.commonName}
              onChange={(e) =>
                setFormData({ ...formData, commonName: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Scientific Name"
              className="border p-3 rounded w-full"
              value={formData.scientificName}
              onChange={(e) =>
                setFormData({ ...formData, scientificName: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded w-full"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Habitat (comma-separated)"
              className="border p-3 rounded w-full"
              value={formData.habitat}
              onChange={(e) =>
                setFormData({ ...formData, habitat: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Size (e.g., Small, Medium, Large)"
              className="border p-3 rounded w-full"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Colors (comma-separated)"
              className="border p-3 rounded w-full"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Photos (comma-separated URLs)"
              className="border p-3 rounded w-full"
              value={formData.photos}
              onChange={(e) =>
                setFormData({ ...formData, photos: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
