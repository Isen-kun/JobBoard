import JobsApplicant from "../Components/Job/JobsApplicant";
import JobsEmployer from "../Components/Job/JobsEmployer";
import { Container } from "reactstrap";

const Jobs = () => {
  return (
    <Container fluid>
      {/* <h3 className="text-center pt-3">Jobs Page</h3> */}
      <div className="p-4">
        {true && <JobsApplicant />}
        {false && <JobsEmployer />}
      </div>
    </Container>
  );
};

export default Jobs;
