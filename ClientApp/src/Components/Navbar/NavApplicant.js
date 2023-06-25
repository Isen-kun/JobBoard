import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const NavApplicant = () => {
  return (
    <>
      <NavItem>
        <NavLink className="nav-link" to="/jobs">
          Listed Jobs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to="/applications">
          My Applications
        </NavLink>
      </NavItem>
    </>
  );
};

export default NavApplicant;