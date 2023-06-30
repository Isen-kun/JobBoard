import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const NavApplicant = () => {
  return (
    <>
      <NavItem>
        <Link className="nav-link" to="/jobs">
          Listed Jobs
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/locations">
          View Locations
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/skills">
          View Skills
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/categories">
          View Categories
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/applications">
          My Applications
        </Link>
      </NavItem>
    </>
  );
};

export default NavApplicant;
