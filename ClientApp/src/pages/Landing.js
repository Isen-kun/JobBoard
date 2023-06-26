import { Container, Row, Col } from "reactstrap";
import RegisterApplicant from "../Components/Register-Login/RegisterApplicant";
import RegisterEmployer from "../Components/Register-Login/RegisterEmployer";
import Login from "../Components/Register-Login/LoginAll";

const Landing = () => {
  return (
    <div className="landing-page">
      <Container>
        <Row className="text-center p-4">
          <Col md={12}>
            <h1>Welcome to the Job Board</h1>
            <h6>Making Tech Hiring simpler and effective</h6>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4}>
            <h3>Register as an Applicant</h3>
            <RegisterApplicant />
          </Col>

          <Col md={4} className="px-5">
            <h3>Login for Users</h3>
            <Login />
          </Col>

          <Col md={4}>
            <h3>Register as an Employer</h3>
            <RegisterEmployer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
