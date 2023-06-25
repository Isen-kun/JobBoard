import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const RegisterEmployer = () => {
  return (
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
  );
};

export default RegisterEmployer;
