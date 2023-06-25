import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import NavApplicant from "./NavApplicant";
import NavEmployer from "./NavEmployer";
import LogoutAll from "../Register-Login/LogoutAll";

const NavBar = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" container="fluid" color="dark" dark>
        <NavbarBrand>
          <NavLink to="/home" className="navbar-brand">
            Job Board
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {true && <NavApplicant />}
            {false && <NavEmployer />}
          </Nav>
          <NavbarText>{true && <LogoutAll />}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
