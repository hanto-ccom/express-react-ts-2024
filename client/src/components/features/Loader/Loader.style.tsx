import styled, { css, keyframes } from "styled-components";

const LoaderDiv = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${() =>
    css`
      ${spinnerAnimation} 1s infinite
    `};
`;

const spinnerAnimation = keyframes` 
  100%{transform: rotate(1turn)}
  `;

// const LoaderDiv = styled.div`
//   width: 80px;
//   height: 40px;
//   border-radius: 100px 100px 0 0;
//   position: relative;
//   overflow: hidden;

//   &:before {
//     content: "";
//     position: absolute;
//     inset: 0 0 -100%;
//     background: radial-gradient(farthest-side, #ffd738 80%, #0000) left 70% top
//         20%/15px 15px,
//       radial-gradient(farthest-side, #020308 92%, #0000) left 65% bottom 19%/12px
//         12px,
//       radial-gradient(farthest-side, #ecfefe 92%, #0000) left 70% bottom 20%/15px
//         15px,
//       linear-gradient(#9eddfe 50%, #020308 0);
//     background-repeat: no-repeat;
//     animation: ${() =>
//       css`
//         ${dayNightAnimation} 2s infinite
//       `};
//   }
// `;
// const dayNightAnimation = keyframes`
//   0%,20%   {transform: rotate(0)}
//   40%,60%  {transform: rotate(.5turn)}
//   80%,100% {transform: rotate(1turn)}
// `;

const Styled = {
  LoaderDiv,
};

export default Styled;
