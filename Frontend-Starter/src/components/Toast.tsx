// Toast.tsx
import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  onConfirmDelete: () => void; // New prop for confirming delete
  type: 'success' | 'error' | 'warning'; // Toast type (success, error, or warning)
}

const Toast: React.FC<ToastProps> = ({ message, onClose, onConfirmDelete, type }) => {
  let bgColor = '';
  let textColor = '';

  // Set colors based on the type
  if (type === 'success') {
    bgColor = 'bg-green-500';
    textColor = 'text-black';
  } else if (type === 'error') {
    bgColor = 'bg-white';
    textColor = 'text-black';
  } else if (type === 'warning') {
    bgColor = 'bg-white';
    textColor = 'text-black';
  }

  return (
    <div
      className={` flex-col-2 fixed top-4 right-4 ${bgColor} ${textColor} py-3 px-6 rounded-md shadow-lg flex justify-between items-center`}
    >
      <div className="flex items-center space-x-2">
        <span>{message}</span>
      </div>
      
      {/* Delete confirmation buttons */}
      <div className="ml-4 flex  space-x-2">
        <div className= "flex">
        <button
          onClick={onConfirmDelete}
          className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
        >
          Confirm Delete
        </button>
        </div>
        <div>
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        </div>
      </div>

      {/* Close button */}
      <button onClick={onClose} className="ml-2 text-xl font-bold text-white">
        X
      </button>
    </div>
  );
};

export default Toast;
