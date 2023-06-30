import { useContext } from "react";
import JobsApplicant from "../Components/Job/JobsApplicant";
import JobsEmployer from "../Components/Job/JobsEmployer";
import { Container } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";

const Jobs = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container fluid>
      {/* <h3 className="text-center pt-3">Jobs Page</h3> */}
      <div className="p-4">
        {currentUser.roleName === "applicant" && <JobsApplicant />}
        {currentUser.roleName === "employer" && <JobsEmployer />}
      </div>
    </Container>
  );
};

export default Jobs;
