import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ openOptionsModal }) {
  return (
    <header className="header">
      <button className="header__modal-btn" onClick={openOptionsModal}>
        Change options
      </button>
      <ThemeToggle></ThemeToggle>
    </header>
  );
}
