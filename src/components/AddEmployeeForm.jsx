import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Form
} from "./ui/form";
import { Input } from "./ui/input";

const AddEmployeeForm = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ firstName: "", lastName: "", phoneNumber: "", email: "" });
  };

  return (
    <Form >
      <form onSubmit={handleSubmit} className="w-1/4">
        <Input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-full"
        />
        <Input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-full"
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={employee.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full"
        />
        <Input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full"
        />
        <Button type="submit">Add Employee's Record</Button>
      </form>
    </Form>
  );
};

export default AddEmployeeForm;
