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

const NavBar = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" container="fluid" color="dark" dark>
        <NavbarBrand>
          <NavLink to="/" className="navbar-brand">
            Job Board
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/about">
                Link 1
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/">
                Link 2
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>User</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
