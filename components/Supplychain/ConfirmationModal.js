// ConfirmationModal.js
"use client"
import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div>
        <p>Are you sure you want to delete this yield?</p>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded mr-4" onClick={onConfirm}>
            Confirm
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
