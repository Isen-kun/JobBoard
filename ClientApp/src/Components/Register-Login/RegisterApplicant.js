import { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterApplicant = () => {
  const { setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableButton, setEnableButton] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "applicantEmail") {
      setEmail(value);
    } else if (name === "applicantPassword") {
      setPassword(value);
    } else if (name === "applicantRePassword") {
      setConfirmPassword(value);
    }

    if (password !== confirmPassword) {
      setEnableButton(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      email,
      password,
    };

    console.log(user);
    fetch("api/Users/RegisterApplicant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Registration failed");
        }
        return res.json();
      })
      .then((data) => {
        window.alert("Registration successful!");
        setLoading(false);
        // clear
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="applicantEmail">Email</Label>
        <Input
          type="email"
          name="applicantEmail"
          id="applicantEmail"
          placeholder="Enter your email address"
          value={email}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="applicantPassword">Password</Label>
        <Input
          type="password"
          name="applicantPassword"
          id="applicantPassword"
          placeholder="Set your password"
          value={password}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="applicantRePassword">Confirm Password</Label>
        <Input
          type="password"
          name="applicantRePassword"
          id="applicantRePassword"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={handleOnChange}
        />
      </FormGroup>
      <Button color="secondary" outline disabled={enableButton}>
        Register
      </Button>
    </Form>
  );
};

export default RegisterApplicant;
