import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalWindow"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modalClose"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="modalContent">
          {children}
        </div>
      </div>
    </div>
  );
}