"use client";

import { useEffect, useState } from "react";
import { createStaff, updateStaff } from "@/services/staff";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  employee?: any;
  isEdit?: boolean;
}

export default function AddStaffDialog({
  open,
  onClose,
  onSuccess,
  employee,
  isEdit = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    role: "",
    department: "",
    employmentType: "",
    shift: "",
    salary: "",
    joiningDate: "",
    emergencyContactName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
  });

  useEffect(() => {
  if (employee) {
    setForm({
      fullName: employee.fullName || "",
      gender: employee.gender || "",
      phone: employee.phone || "",
      email: employee.email || "",
      address: employee.address || "",
      role: employee.role || "",
      department: employee.department || "",
      employmentType: employee.employmentType || "",
      shift: employee.shift || "",
      salary: employee.salary?.toString() || "",
      joiningDate: employee.joiningDate
        ? employee.joiningDate.substring(0, 10)
        : "",
      emergencyContactName: employee.emergencyContactName || "",
      emergencyRelationship: employee.emergencyRelationship || "",
      emergencyPhone: employee.emergencyPhone || "",
    });
  } else {
    resetForm();
  }
}, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      role: "",
      department: "",
      employmentType: "",
      shift: "",
      salary: "",
      joiningDate: "",
      emergencyContactName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    });
  };

 

  const handleSubmit = async () => {
     if (
  !form.fullName ||
  !form.phone ||
  !form.role ||
  !form.salary ||
  !form.joiningDate
) {
  alert("Please fill all required fields.");
  return;
}
    try {
      setLoading(true);

      if (isEdit && employee) {
  await updateStaff(employee.id, form);
} else {
  await createStaff(form);
}

      onSuccess();

      resetForm();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-5xl bg-slate-950 border border-slate-800 text-white">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Fill the employee information below.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">

          {/* PERSONAL INFORMATION */}

          <div className="mb-8">

            <h3 className="mb-5 text-lg font-semibold text-emerald-400">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <Label>Full Name</Label>

                <Input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder="Rahul Sharma"
                />
              </div>

              <div>
                <Label>Gender</Label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <Label>Phone</Label>

                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Email</Label>

                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Address</Label>

                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

            </div>

          </div>

          {/* JOB INFORMATION */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-emerald-400">
              Job Information
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <Label>Role</Label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
                >
                  <option value="">Select Role</option>
                  <option>Manager</option>
                  <option>Chef</option>
                  <option>Cashier</option>
                  <option>Waiter</option>
                  <option>Receptionist</option>
                  <option>Housekeeping</option>
                  <option>Cleaner</option>
                  <option>Security</option>
                </select>
              </div>

              <div>
                <Label>Department</Label>

                <Input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Employment Type</Label>

                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
                >
                  <option value="">Select</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <Label>Shift</Label>

                <select
                  name="shift"
                  value={form.shift}
                  onChange={handleChange}
                  className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
                >
                  <option value="">Select Shift</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>

              <div>
                <Label>Salary</Label>

                <Input
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Joining Date</Label>

                <Input
                  name="joiningDate"
                  type="date"
                  value={form.joiningDate}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

            </div>

          </div>

          <div className="mt-8">
  <h3 className="mb-5 text-lg font-semibold text-emerald-400">
    Emergency Contact
  </h3>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

    <div>
      <Label>Contact Name</Label>

      <Input
        className="mt-2"
        name="emergencyContactName"
        value={form.emergencyContactName}
        onChange={handleChange}
      />
    </div>

    <div>
      <Label>Relationship</Label>

      <Input
        className="mt-2"
        name="emergencyRelationship"
        value={form.emergencyRelationship}
        onChange={handleChange}
      />
    </div>

    <div className="md:col-span-2">
      <Label>Phone</Label>

      <Input
        className="mt-2"
        name="emergencyPhone"
        value={form.emergencyPhone}
        onChange={handleChange}
      />
    </div>

  </div>
</div>

        </div>

        <DialogFooter className="mt-6">

          <Button
  type="button"
  variant="outline"
  onClick={onClose}
  className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
>
  Cancel
</Button>

          <Button
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? "Saving..."
    : isEdit
    ? "Update Employee"
    : "Save Employee"}
</Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}