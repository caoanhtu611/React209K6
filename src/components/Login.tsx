import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const onSubmit = async (value) => {
    console.log(value);
    const res = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      navigate("/students");
      alert("Thêm Thành Công!");
    } else {
      alert(data);
    }
    // navigate("/students");
  };
  return (
    <div>
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Login to your Account
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-25">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
