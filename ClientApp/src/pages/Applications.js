import { useContext } from "react";
import ApplicationsApplicant from "../Components/Application/ApplicationsApplicant";
import ApplicationsEmployer from "../Components/Application/ApplicationsEmployer";
import { Container } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";

const Applications = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container fluid>
      {/* <h3 className="text-center pt-3">Applications page</h3> */}
      <div className="p-4">
        {currentUser.roleName === "applicant" && <ApplicationsApplicant />}
        {currentUser.roleName === "employer" && <ApplicationsEmployer />}
      </div>
    </Container>
  );
};

export default Applications;
