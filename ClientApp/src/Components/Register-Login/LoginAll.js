import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = () => {
  return (
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
  );
};

export default Login;
