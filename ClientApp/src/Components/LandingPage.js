import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container>
        <Row className="text-center p-5">
          <Col md={12}>
            <h1>Welcome to the Job Board</h1>
            <h6>Making Tech Hiring simpler and effective</h6>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4}>
            <h3>Register as an Applicant</h3>
            <Form>
              <FormGroup>
                <Label for="applicantEmail">Email</Label>
                <Input
                  type="email"
                  name="applicantEmail"
                  id="applicantEmail"
                  placeholder="Enter your email address"
                />
              </FormGroup>
              <FormGroup>
                <Label for="applicantPassword">Password</Label>
                <Input
                  type="password"
                  name="applicantPassword"
                  id="applicantPassword"
                  placeholder="Set your password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="applicantRePassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="applicantRePassword"
                  id="applicantRePassword"
                  placeholder="Re-enter your password"
                />
              </FormGroup>
              <Button color="secondary">Register</Button>
            </Form>
          </Col>

          <Col md={4} className="px-5">
            <h3>Login for Users</h3>
            <Form>
              <FormGroup>
                <Label for="loginEmail">Email</Label>
                <Input
                  type="email"
                  name="loginEmail"
                  id="loginEmail"
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="loginPassword">Password</Label>
                <Input
                  type="password"
                  name="loginPassword"
                  id="loginPassword"
                  placeholder="Enter your password"
                />
              </FormGroup>
              <Button color="primary" outline>
                Login
              </Button>
            </Form>
          </Col>

          <Col md={4}>
            <h3>Register as an Employer</h3>
            <Form>
              <FormGroup>
                <Label for="employerEmail">Email</Label>
                <Input
                  type="email"
                  name="employerEmail"
                  id="employerEmail"
                  placeholder="Enter your email address"
                />
              </FormGroup>
              <FormGroup>
                <Label for="employerPassword">Password</Label>
                <Input
                  type="email"
                  name="employerPassword"
                  id="employerPassword"
                  placeholder="Set your password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="employerRePassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="employerRePassword"
                  id="employerRePassword"
                  placeholder="Re-enter your password"
                />
              </FormGroup>
              <Button color="secondary">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
