import {
    css,
    keyframes,
} from 'styled-components';

const wiggleAnimation = keyframes`
  0% { transform: translate(2px, 0px); }
  20% { transform: translate(-2px, 0px); }
  40% { transform: translate(2px, 0px); }
  60% { transform: translate(-2px, 0px); }
  80% { transform: translate(2px, 0px); }
  100% { transform: translate(0px, 0px); }
`;

export const wiggleMixin = css`
  animation: ${wiggleAnimation} 0.5s ease-in-out;
`;