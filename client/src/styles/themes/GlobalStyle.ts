import { createGlobalStyle } from 'styled-components';

//Examples of global styles
const GlobalStyle = createGlobalStyle`
  /* Basic Reset */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Body */
  body {
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: ${(props) => props.theme.typography.fontSize};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  p {
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  /* Links */
  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primaryHover};
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Form Elements */
  input, button, textarea, select {
    font: inherit;
    margin: 0;
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border};    
    border-radius: ${(props) => props.theme.borderRadii.small};
  }

  button {
    cursor: pointer;
    margin: ${(props) => props.theme.margin.sm};
    min-width:100px;
  }

  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  textarea {
    resize: vertical;
  }

  /* Images and Videos */
  img, video {
    max-width: 100%;
    height: auto;
  }

  /* Accessibility */
  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  /* Responsive Design */
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    /* Mobile-specific styles here */
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    /* Tablet and up */
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    /* Desktop and up */
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: ${(props) => props.theme.borderRadii.small};
    border: 3px solid ${(props) => props.theme.colors.background};
  }
`;

export default GlobalStyle;
