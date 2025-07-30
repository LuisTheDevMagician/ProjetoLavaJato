"use client";

import styles from "./styles.module.scss";

interface AceitarButtonProps {
  texto: string;
  onClick: () => void;
  disabled?: boolean;
}

export function AceitarButton({ texto, onClick, disabled }: AceitarButtonProps) {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}
