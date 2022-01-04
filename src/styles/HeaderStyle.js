import styled from "styled-components";

const HeaderStyle = styled.div`
  .nav-butt:focus {
    box-shadow: none;
    background-color: #3e8e7e;
  }

  .header {
    box-sizing: border-box;
  }
  .title {
    font-weight: 700;
    letter-spacing: 0;
    font-size: 1.5rem;
    color: black;
  }
  .nav-item {
    font-weight: 600;
    font-size: 1.04rem;
  }
  .nav-link {
    color: #3e8e7e;
  }
  .nav-link:hover,
  .nav-link:focus {
    color: #28584e;
  }
  .active {
    color: #28584e;
  }
  .btn-profile {
    width: 40px;
    height: 40px;
  }
  .prof-pic {
    height: 100%;
    width: 100%;
  }
  .prof-item {
    background-color: white;
    transition: 100ms;
  }
  .prof-item:focus,
  .prof-item:hover {
    background-color: #3e8e7e;
    color: white;
  }
  .dropdown-menu {
    transition: 300ms;
  }
`;

export default HeaderStyle;
