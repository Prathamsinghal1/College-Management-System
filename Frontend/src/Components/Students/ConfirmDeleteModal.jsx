// ConfirmDeleteModal.jsx
import { Trash } from 'lucide-react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-purple-700 text-3xl">Confirm Deletion</h2>
        <p className="text-gray-600 my-2 mb-4 text-sm">Are you sure you want to delete this student?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-gradient-to-br from-pink-300 to-pink-400 hover:from-red-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg flex items-center"
          >
            <Trash className="inline-block mr-2" size={22} /> Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white hover:scale-105 transition-all duration-300 transform"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
