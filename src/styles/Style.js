import styled from "styled-components";
//custom style
const Style = styled.div`
  .bg-palette-1 {
    background-color: #3e8e7e;
  }
  .bg-palette-2 {
    background-color: #7cd1b8;
  }
  .bg-palette-3 {
    background-color: #fabb51;
  }
  .bg-palette-4 {
    background-color: #faedc6;
  }
  .bg-palette-5 {
    background-color: #28584e;
  }
  .bg-palette-6 {
    background-color: #d95734;
  }
  .font-default {
    font-family: "Source Sans Pro";
  }
  .font-head {
    font-family: "Source Sans Pro";
    font-weight: 700;
  }
  .palette-1 {
    color: #3e8e7e;
  }
  .palette-2 {
    color: #7cd1b8;
  }
  .palette-3 {
    color: #fabb51;
  }
  .palette-4 {
    color: #faedc6;
  }
  .palette-5 {
    color: #28584e;
  }
  .palette-6 {
    color: #d95734;
  }
  .btn-start {
    background-color: #7cd1b8;
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 10px;
    color: #28584e;
  }
  .btn-start:hover {
    background-color: #3e8e7e;
    color: #faedc6;
  }

  .btn-mid {
    background-color: #7cd1b8;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
    color: #28584e;
    width: 100%;
  }
  .btn-mid:hover {
    background-color: #3e8e7e;
    color: white;
  }
  .btn:focus {
    box-shadow: none;
  }
  .btn-back {
    transition: 150ms;
  }
  .btn-back:hover {
    transform: scale(1.3);
  }
  .margin-header {
    margin-top: 62px;
  }
  .btn-thumb {
    background-color: #7cd1b8;
    color: #28584e;
  }
  .btn-thumb:hover {
    background-color: #3e8e7e;
    color: #fabb51;
  }
  .btn-palette-3 {
    background-color: #fabb51;
    color: #28584e;
  }
  .btn-palette-3:hover {
    background-color: #cf9e48;
    color: #7cd1b8;
  }
  .btn-palette-6 {
    background-color: #d95734;
    color: black;
  }
  .btn-palette-6:hover {
    background-color: #c2492f;
    color: #fabb51;
  }
  .body {
    min-height: calc(100vh - 62px);
  }
  .form-1 {
    display: block;
    border: none;
    border-bottom: 2px solid #3e8e7e;
    width: 100%;
    margin-bottom: 20px;
    transition: color 100ms;
    background-color: transparent;
  }
  .form-1::placeholder {
    color: #28584e;
  }
  .form-1:focus {
    outline: none;
  }
  .form-1:focus::placeholder {
    color: transparent;
  }
  .btn-outline-success:hover {
    background-color: #3e8e7e;
    color: #fabb51;
  }
  .form-control::placeholder {
    /* Microsoft Edge */
    color: #28584e;
    transition: 100ms;
  }
  .form-control:focus::placeholder {
    color: #fabb51;
  }
  .btn-outline-success {
    color: #3e8e7e;
    border-color: #3e8e7e;
  }
  .form-control {
    background-color: #faedc6;
    transition: background-color 100ms;
    border: none;
  }
  .form-control:focus {
    background-color: #f5f4f4;
    box-shadow: none;
  }
  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset !important;
    outline: none;
  }
  .pagination-item {
    background-color: #7cd1b8 !important;
    border: 1px solid #28584e;
    color: #28584e;
  }
  .pagination-item:focus {
    box-shadow: none;
  }
  .pagination-item:hover,
  .pagination-item.active {
    background-color: #3e8e7e !important;
    border: 1px solid #fabb51;
    color: #faedc6;
  }
  .pagination-item.disabled {
    border-color: #28584e;
  }
`;
export default Style;
