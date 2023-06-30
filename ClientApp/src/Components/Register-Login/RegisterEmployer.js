import { useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterEmployer = () => {
  const { setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "employerEmail") {
      setEmail(value);
    } else if (name === "employerPassword") {
      setPassword(value);
    } else if (name === "employerRePassword") {
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
      name: "EMPLOYER NAME",
      email,
      password,
    };

    fetch("api/Users/registerEmployer", {
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
        if (data.message === "New Employer registered") {
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
        <Label for="employerEmail">Email</Label>
        <Input
          type="email"
          name="employerEmail"
          id="employerEmail"
          placeholder="Enter your email address"
          value={email}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="employerPassword">Password</Label>
        <Input
          type="password"
          name="employerPassword"
          id="employerPassword"
          placeholder="Set your password"
          value={password}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="employerRePassword">Confirm Password</Label>
        <Input
          type="password"
          name="employerRePassword"
          id="employerRePassword"
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

export default RegisterEmployer;
