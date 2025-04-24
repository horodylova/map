"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../app/globals.css";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow} ref={modalRef}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}