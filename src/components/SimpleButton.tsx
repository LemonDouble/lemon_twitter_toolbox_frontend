import React, { MouseEventHandler } from "react";

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export interface SimpleButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  ButtonText: string;
}

export default function SimpleButton({
  onClick,
  ButtonText,
}: SimpleButtonProps) {
  return (
    <button css={style} onClick={onClick}>
      {ButtonText}
    </button>
  );
}

const style = css({
  width: 300,
  height: 100,
  border: "none",
  color: "white",
  backgroundColor: "#1C2B75",
  borderRadius: 4,
  boxShadow: "inset 0 0 0 0 #93B0F5",
  transition: "ease-out 0.3s",
  fontSize: "3rem",
  outline: "none",
  ":hover": {
    boxShadow: "inset 300px 0 0 0 #93B0F5",
    cursor: "pointer",
    color: "#1C2B75",
  },
});
