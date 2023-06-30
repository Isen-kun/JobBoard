import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const NavEmployer = () => {
  return (
    <>
      <NavItem>
        <Link className="nav-link" to="/jobs">
          My Listed Jobs
        </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/applications">
          View Applications
        </Link>
      </NavItem>
    </>
  );
};

export default NavEmployer;
