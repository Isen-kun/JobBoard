import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const RegisterApplicant = () => {
  return (
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
  );
};

export default RegisterApplicant;
