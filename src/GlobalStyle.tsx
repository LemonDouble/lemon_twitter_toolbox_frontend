/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Youth", "Jeju Gothic",
            "나눔바른고딕", "나눔고딕", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        @font-face {
          font-family: "Youth";
          font-style: normal;
          font-weight: 400;
          src: url("//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff2")
              format("woff2"),
            url("//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff")
              format("woff");
        }
        .youth * {
          font-family: "Youth", sans-serif;
        }

        @import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);

        .jejugothic * {
          font-family: "Jeju Gothic", sans-serif;
        }
      `}
    />
  );
}
