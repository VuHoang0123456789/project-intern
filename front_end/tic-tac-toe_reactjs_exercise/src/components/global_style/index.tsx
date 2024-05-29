import React from "react";
import "./style.css";

interface props {
  children: React.ReactNode;
}

function GlobalStyle({ children }: props) {
  return children;
}

export default GlobalStyle;
