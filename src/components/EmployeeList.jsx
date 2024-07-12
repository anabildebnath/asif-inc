import classes from "../styles/EmployeeList.module.css";
import React from "react";
import EmployeeRow from "./EmployeeRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const EmployeeList = ({
  employees,
  updateEmployee,
  deleteEmployee,
  toggleBlockEmployee,
}) => {
  return (
    <Table className="w-full my-8">
      <TableHeader className="w-full">
        <TableRow className="w-full">
          <TableHead className={`${classes.center} w-1/4`}>Name</TableHead>
          <TableHead className={`${classes.center} w-1/4`}>Email</TableHead>
          <TableHead className={`${classes.center} w-1/4`}>Phone</TableHead>
          <TableHead className={`${classes.center} w-1/4`}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {employees.length === 0 ? (
          <TableRow className="w-full">
            <TableCell className={classes.center} colSpan={4}>No employees found.</TableCell>
          </TableRow>
        ) : (
          employees.map((employee) => (
            <EmployeeRow 
              key={employee.id}
              employee={employee}
              updateEmployee={updateEmployee}
              deleteEmployee={deleteEmployee}
              toggleBlockEmployee={toggleBlockEmployee}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeList;
