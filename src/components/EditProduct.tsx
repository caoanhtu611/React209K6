import { IProduct } from "@/interface/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { yupResolver } from "@hookform/resolvers/yup";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// import * as yup from "yup";
const schema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().required().min(6),
  email: Joi.string().required(),
  phonenumber: Joi.string().required(),
});
const EditProduct = () => {
  const [students, setStudents] = useState<IProduct>({});
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const onSubmit = async (value) => {
    console.log(value);
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    console.log(data);
    alert("Cập Nhật Thành Công!");

    setTimeout(() => {
      navigate("/students");
    }, 1000);
  };
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    const data = await res.json();
    setStudents(data);
    reset(data);
  };

  return (
    <div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Edit Student
      </h3>
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

export default EditProduct;
