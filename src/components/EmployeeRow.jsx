import React, { useState } from "react";
import classes from "../styles/EmployeeRow.module.css";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TableCell, TableRow } from "./ui/table";

const EmployeeRow = ({
  employee,
  updateEmployee,
  deleteEmployee,
  toggleBlockEmployee,
}) => {
  // const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    phoneNumber: employee.phoneNumber,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleSave = () => {
    updateEmployee(employee.id, updatedEmployee);
    // setIsEditing(false);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    deleteEmployee(employee.id);
    setDialogOpen(false);
  };

  const handleToggleBlock = () => {
    toggleBlockEmployee(employee.id);
    setDialogOpen(false);
  };

  const openDialog = (action) => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  return (
    <TableRow className="w-60">
      <TableCell className="text-center">
        {employee.firstName} {employee.lastName}
      </TableCell>
      <TableCell className="text-center">{employee.email}</TableCell>
      <TableCell className="text-center">{employee.phoneNumber}</TableCell>
      <TableCell className="text-center">
        <div className={classes.btn}>
          <Button onClick={() => openDialog("edit")}>Edit</Button>
          <Button onClick={() => openDialog("delete")}>Delete</Button>
          <Button onClick={() => openDialog("toggleBlock")}>
            {employee.isBlocked ? "Unblock" : "Block"}
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {dialogAction === "edit"
                  ? "Edit Employee"
                  : dialogAction === "delete"
                  ? "Delete Employee"
                  : "Block/Unblock Employee"}
              </DialogTitle>
              <DialogDescription>
                {dialogAction === "edit"
                  ? "Make changes to the employee details and save."
                  : dialogAction === "delete"
                  ? "Are you sure you want to delete this employee?"
                  : "Are you sure you want to block/unblock this employee?"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {dialogAction === "edit" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstName" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={updatedEmployee.firstName}
                      onChange={handleEditChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastName" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={updatedEmployee.lastName}
                      onChange={handleEditChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phoneNumber" className="text-right">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={updatedEmployee.phoneNumber}
                      onChange={handleEditChange}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              {dialogAction === "edit" && (
                <Button onClick={handleSave}>Save changes</Button>
              )}
              {dialogAction === "delete" && (
                <Button onClick={handleDelete}>Confirm Delete</Button>
              )}
              {dialogAction === "toggleBlock" && (
                <Button onClick={handleToggleBlock}>
                  {employee.isBlocked ? "Unblock" : "Block"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
