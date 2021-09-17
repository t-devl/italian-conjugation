import React from "react";

export default function Header({ openOptionsModal }) {
  return (
    <header className="header">
      <button className="header__btn" onClick={openOptionsModal}>
        Change options
      </button>
    </header>
  );
}
