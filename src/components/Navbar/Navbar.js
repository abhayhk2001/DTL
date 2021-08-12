import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        {/* <Bars /> */}

        <NavMenu>
          <NavLink to="/index" activeStyle>
            Covid Combatants
          </NavLink>
        </NavMenu>
        <NavMenu>
          <NavBtn>
            <NavBtnLink to="/second">States</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to="/require">Requirements</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
