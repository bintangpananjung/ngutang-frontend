import styled from "styled-components";
const CardStyle = styled.div`
  .card-container {
    border-radius: 1.3rem;
  }
  .card-content {
    width: 100%;
  }
  .card-btn {
    width: 10rem;
    min-width: 10rem;
  }
  .card-btn .btn {
    width: 4.5rem;
  }
  .modal-trans {
    /* animation: modal-transition 300ms; */
    opacity: 0;
    visibility: hidden;
    transition: 150ms;
  }
  .modal-trans.show {
    opacity: 1;
    visibility: visible;
    /* transition: 300ms; */
  }
  .modal-backdrop {
    opacity: 0;
    visibility: hidden;
  }
  .modal-backdrop.show {
    opacity: 0.75;
    visibility: visible;
  }
  .close-but {
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 100ms;
  }
  .close-but:hover {
    transform: scale(1.2);
  }

  input:-internal-autofill-selected {
    background-color: black !important;
  }
  @media screen and (max-width: 390px) {
    .card-content {
      flex-direction: column;
    }
    .card-content img {
      margin-top: 1rem;
    }
  }
  .scroll-container {
    overflow: auto;
    height: 100%;
  }

  //scrollbar
  /* width */
  .scroll-container::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  .scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  .scroll-container::-webkit-scrollbar-thumb {
    background: #faedc6;
    border-radius: 0.5rem;
  }

  /* Handle on hover */
  .scroll-container::-webkit-scrollbar-thumb:hover {
    background: #fabb51;
  }

  //pagination
`;
export default CardStyle;
