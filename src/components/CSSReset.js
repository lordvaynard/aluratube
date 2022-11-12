import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.backgroundBase};
    color: ${({ theme }) => theme.textColorBase};
  }
  /* NextJS */
  html {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  body {
    display: flex;
    flex: 1;
  }
  #__next {
    display: flex;
    flex: 1;
  }
  /* Globals */
  button,
  a {
    text-decoration: none;
    opacity: 1;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.backgroundBase} ${({ theme }) => theme.textColorBase};
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.textColorBase};
}

*::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.backgroundBase};
  border-radius: 20px;
  border: 3px solid ${({ theme }) => theme.textColorBase};
}


`;
