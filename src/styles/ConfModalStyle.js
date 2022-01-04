import styled from "styled-components";

const ConfModalStyle = styled.div`
  .conf-trans {
    /* animation: conf-transition 300ms; */
    opacity: 0;
    visibility: hidden;
    transition: opacity 150ms;
  }
  .conf-trans.show {
    opacity: 1;
    visibility: visible;
    /* transition: 150ms; */
  }
  .conf-backdrop {
    opacity: 0;
    visibility: hidden;
  }
  .conf-backdrop.show {
    opacity: 0.75;
    visibility: visible;
  }
`;

export default ConfModalStyle;
