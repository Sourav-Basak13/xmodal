import React, { PropsWithChildren, useEffect, useRef } from "react";

export default function CustomModal({
  open,
  onClose,
  children,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleRootClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    const root = document.getElementById("root");
    if (open && root) {
      root.addEventListener("click", handleRootClick);
    }
    return () => {
      if (root) {
        root.removeEventListener("click", handleRootClick);
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
}
