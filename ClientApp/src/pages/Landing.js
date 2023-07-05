import { Container, Row, Col, Spinner } from "reactstrap";
import RegisterApplicant from "../Components/Register-Login/RegisterApplicant";
import RegisterEmployer from "../Components/Register-Login/RegisterEmployer";
import Login from "../Components/Register-Login/LoginAll";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Landing = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="landing-page">
      <Container>
        <Row className="text-center p-5">
          <Col md={12}>
            <h1 style={{ color: "white" }}>Welcome to the Job Board💼</h1>
            <h6 style={{ color: "WhiteSmoke" }}>
              Making Tech Hiring simpler and effective💻
            </h6>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center p-5 m-5">
            <Spinner type="grow" />
          </div>
        ) : (
          <Row className="pt-2">
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
        )}
      </Container>
    </div>
  );
};

export default Landing;
