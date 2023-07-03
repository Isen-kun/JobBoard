import { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";
import NavApplicant from "./NavApplicant";
import NavEmployer from "./NavEmployer";
import LogoutAll from "../Register-Login/LogoutAll";
import { AuthContext } from "../../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" container="fluid" color="dark" dark>
        {/* <NavbarBrand> */}
          <Link to="/home" className="navbar-brand">
            Job Board
          </Link>
        {/* </NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {currentUser.roleName === "applicant" && <NavApplicant />}
            {currentUser.roleName === "employer" && <NavEmployer />}
          </Nav>
          <NavbarText>{true && <LogoutAll />}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
