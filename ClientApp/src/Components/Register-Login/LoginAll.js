import { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setLoading(true);

    const user = {
      email,
      password,
    };

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
        setLoading(false);

        // Save the token in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.alert("Login successful!");

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login failed. Please try again.");
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
          value={email}
          onChange={handleOnChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="loginPassword">Password</Label>
        <Input
          type="password"
          name="loginPassword"
          id="loginPassword"
          placeholder="Enter your password"
          value={password}
          onChange={handleOnChange}
          required
        />
      </FormGroup>
      <Button color="primary">Login</Button>
    </Form>
  );
};

export default Login;
