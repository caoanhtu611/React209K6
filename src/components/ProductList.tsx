import { IProduct } from "@/interface/product";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [students, setStudents] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    const res = await fetch(`http://localhost:3000/products`);
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (id: number) => {
    const check = confirm("Do you want to delete this student?");
    if (check) {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      getAll();
      alert("Xóa Thành Công!");
    }
  };
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Students List
          </h2>
          <Button onClick={() => navigate(`/students/add`)} variant="primary">
            Add Student
          </Button>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <table border={1} className="text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.length &&
                  students.map((item, index) => {
                    console.log(item);
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td>{item.phonenumber}</td>
                        <td>
                          <Button
                            onClick={() =>
                              navigate(`/students/edit/${item.id}`)
                            }
                            variant="warning"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
