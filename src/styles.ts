import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body, input, button {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }
`;
