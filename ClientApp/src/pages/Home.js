import { Container } from "reactstrap";
import ApplicantDashboard from "../Components/Dashboard/ApplicantDashboard";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  // const dummyUser = {
  //   id: 1,
  //   name: "Rajorshi Ghosh",
  //   email: "rajorshi@email.com",
  //   roleName: "Applicant",
  // };

  const { currentUser } = useContext(AuthContext);

  const totalApplications = 0;
  const totalSelectedApplications = 0;

  console.log(currentUser);

  return (
    <Container>
      {/* <h2 className="text-center p-3">Home Page</h2> */}
      <div className="pt-4">
        <ApplicantDashboard
          user={currentUser}
          totalApplications={totalApplications}
          totalSelectedApplications={totalSelectedApplications}
        />
      </div>
    </Container>
  );
};

export default Home;
