import styled from "styled-components";

// Function to determine padding based on variant
const getPadding = (variant: "sm" | "md" | "lg" | undefined) => {
  switch (variant) {
    case "sm":
      return "8px 12px"; // Example padding for small variant
    case "md":
      return "10px 16px"; // Example padding for medium variant
    case "lg":
      return "17px 20px"; // Example padding for large variant
    default:
      return "10px 16px"; // You need to define this fallback padding
  }
};

// Function to determine font size based on variant
// const getFontSize = (variant: any) => {
//   switch (variant) {
//     case 'sm':
//       return '0.8rem'; // Example font size for small variant
//     case 'md':
//       return '1rem'; // Example font size for medium variant
//     case 'lg':
//       return '1.2rem'; // Example font size for large variant
//     default:
//       return '1rem'; // Fallback font size
//   }
// };

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})<{ variant?: "sm" | "lg" | "md" }>`
 padding: ${(props) => getPadding(props.variant)};

  transition: border-color 300ms ease-in-out;
  background: orange;
  color: white;
  border-color: orange;
  outline: none;
  border-width: 1px;

  &:hover,
  &:focus {
    border-color: gray;
  }

  &[disabled"] {
    background-color: ${(props) => props.theme.palette.gloom};
    border-color: ${(props) => props.theme.palette.pitchBlack};
    cursor: default;
  }
`;

const Styled = {
  Button,
};

export default Styled;
