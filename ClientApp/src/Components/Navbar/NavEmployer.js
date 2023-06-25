import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const NavEmployer = () => {
  return (
    <>
      <NavItem>
        <NavLink className="nav-link" to="/jobs">
          My Listed Jobs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav-link" to="/applications">
          View Applications
        </NavLink>
      </NavItem>
    </>
  );
};

export default NavEmployer;
