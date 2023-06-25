import ApplicationsApplicant from "../Components/Application/ApplicationsApplicant";
import ApplicationsEmployer from "../Components/Application/ApplicationsEmployer";
import { Container } from "reactstrap";

const Applications = () => {
  return (
    <Container fluid>
      <h3 className="text-center pt-3">Applications page</h3>
      <div className="p-3">
        {true && <ApplicationsApplicant />}
        {false && <ApplicationsEmployer />}
      </div>
    </Container>
  );
};

export default Applications;
