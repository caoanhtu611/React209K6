import { IProduct } from "@/interface/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { yupResolver } from "@hookform/resolvers/yup";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import * as yup from "yup";

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required().min(6),
  email: Joi.string().required(),
  phonenumber: Joi.string().required(),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const onSubmit = async (value) => {
    const res = await fetch(`http://localhost:3000/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    console.log(data);
    navigate("/students");
    alert("Thêm Thành Công!");
  };
  return (
    <div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>Add Student</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="w-25" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Enter Student Name"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              id=""
              placeholder="Age"
              {...register("age")}
            />
            <p>{errors.age?.message}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id=""
              placeholder="Email"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Phone Number"
              {...register("phonenumber")}
            />
            <p>{errors.phonenumber?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
