import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { ProfileContext } from "../../Providers/ProfileProvider";
import "./Login_Reg.css"

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();
    const { login } = useContext(ProfileContext);

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .catch(() => alert("Invalid email or password"));
  };

    return (
        <Form onSubmit={loginSubmit}>
        <fieldset>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Login</Button>
          </FormGroup>
          <em>
            New to ContractThis? <Link to="/register">Register Here</Link>
          </em>
        </fieldset>
      </Form>
    )
}

export default Login