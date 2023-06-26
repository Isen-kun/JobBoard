import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "loginEmail") {
      setEmail(value);
    } else if (name === "loginPassword") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);
    fetch("api/Users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log(data);
        // Save the token in local storage
        // localStorage.setItem("token", data.token);
        window.alert("Login successful!");
        //window.location.reload();
        // Redirect to /home
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login failed. Please try again.");

        //window.location.reload();
        // Reload the page
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="loginEmail">Email</Label>
        <Input
          type="email"
          name="loginEmail"
          id="loginEmail"
          placeholder="Enter your email"
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="loginPassword">Password</Label>
        <Input
          type="password"
          name="loginPassword"
          id="loginPassword"
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
      </FormGroup>
      <Button color="primary" outline>
        Login
      </Button>
    </Form>
  );
};

export default Login;
