import { PropsWithChildren, useEffect, useRef } from "react";

export default function CustomModal({
  children,
  open,
  onClose,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  const modalRef = useRef<HTMLDivElement | null>(null);

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
  }, [open]);

  useEffect(() => {
    const id = "custom-modal-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      .cm-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 620px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        z-index: 9999;
        padding: 16px;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {open && (
        <div className="cm-modal" ref={modalRef}>
          {children}
        </div>
      )}
    </>
  );
}
