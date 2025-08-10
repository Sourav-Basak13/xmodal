// CustomModal.tsx
import React, { useEffect, useRef } from "react";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({
  open,
  onClose,
  children,
}: CustomModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null; // ❗ modal removed from DOM entirely

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
