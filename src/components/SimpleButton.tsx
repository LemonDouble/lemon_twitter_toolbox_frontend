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
  backgroundColor: "red",
  borderRadius: 4,
  boxShadow: "inset 0 0 0 0 #f9e506",
  transition: "ease-out 0.3s",
  fontSize: "3rem",
  outline: "none",
  ":hover": {
    boxShadow: "inset 300px 0 0 0 #f9e506",
    cursor: "pointer",
    color: "#000",
  },
});
