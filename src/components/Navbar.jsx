import styled from 'styled-components';

const NavbarContainer = styled.div`
  top: 0;
  width: 100%;
  position: fixed;
  background: white;
  z-index: 9999;
  height: 74px;
`;

const Navbar = () => {
  return <NavbarContainer></NavbarContainer>;
};

export default Navbar;
