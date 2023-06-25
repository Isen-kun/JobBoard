import { Container } from "reactstrap";
import ApplicantDashboard from "../Components/Dashboard/ApplicantDashboard";

const Home = () => {
  const dummyUser = {
    Id: 1,
    Name: "Rajorshi Ghosh",
    Email: "rajorshi@email.com",
    Role: "Applicant",
  };

  const totalApplications = 0;
  const totalSelectedApplications = 0;

  return (
    <Container>
      <h2 className="text-center p-3">Home Page</h2>
      <ApplicantDashboard
        user={dummyUser}
        totalApplications={totalApplications}
        totalSelectedApplications={totalSelectedApplications}
      />
    </Container>
  );
};

export default Home;
