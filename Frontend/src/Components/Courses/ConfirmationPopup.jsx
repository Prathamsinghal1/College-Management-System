import { Trash } from 'lucide-react';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999999]">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm z-10">
        <h2 className="text-lg font-bold text-purple-700 text-3xl">Confirm Deletion</h2>
        <p className="text-gray-600 mt-2 text-sm">
          Are you sure you want to delete this course? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-gradient-to-br from-pink-300 to-pink-400 hover:from-red-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg flex items-center"
          >
            <Trash className="inline-block mr-2" size={22} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
