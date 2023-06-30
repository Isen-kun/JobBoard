import { useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterApplicant = () => {
  const { setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "applicantEmail") {
      setEmail(value);
    } else if (name === "applicantPassword") {
      setPassword(value);
    } else if (name === "applicantRePassword") {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      name: "APPLICANT NAME",
      email,
      password,
    };

    fetch("api/Users/registerApplicant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          // Check for error status
          throw new Error("Registration failed");
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "New Applicant registered") {
          window.alert("Registration successful! Kindly login.");
          setLoading(false);
          // clear;
          window.location.reload();
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("Registration failed. Please try again.");
        setLoading(false);
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
      <Button color="secondary" outline disabled={disableButton}>
        Register
      </Button>
    </Form>
  );
};

export default RegisterApplicant;
