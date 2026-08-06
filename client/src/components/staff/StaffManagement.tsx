"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Users,
  UserCheck,
  UserMinus,
  UserPlus,
  Search,
} from "lucide-react";

import EmployeesTab from "./EmployeesTab";
import AttendanceTab from "./AttendanceTab";
import LeaveTab from "./LeaveTab";

import { deleteStaff, getStaff } from "@/services/staff";
import AddStaffDialog from "./AddStaffDialog";

export default function StaffManagement() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
const [activeTab, setActiveTab] = useState<
  "employees" | "attendance" | "leave"
>("employees");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const data = await getStaff();

      setStaff(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  

//   const handleEdit = (employee: any) => {
//   setSelectedEmployee(employee);
//   setIsEdit(true);
//   setOpenDialog(true);
// };

  if (!confirmed) return;

  try {
    await deleteStaff(id);

    fetchStaff();
  } catch (error) {
    console.error(error);
    alert("Failed to delete employee.");
  }
};
const handleEdit = (employee: any) => {
  setSelectedEmployee(employee);
  setIsEdit(true);
  setOpenDialog(true);
};

  const filteredStaff = useMemo(() => {
    return staff.filter((employee) => {
      const matchesSearch =
        employee.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.employeeId
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All" || employee.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staff, search, roleFilter, statusFilter]);

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (s) => s.status === "Active"
  ).length;

  const onLeave = staff.filter(
    (s) => s.status === "On Leave"
  ).length;

  const newThisMonth = staff.filter((s) => {
    const joining = new Date(s.joiningDate);
    const now = new Date();

    return (
      joining.getMonth() === now.getMonth() &&
      joining.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Staff Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your restaurant employees.
          </p>

          <div className="mt-6 flex gap-3">
  <button
    onClick={() => setActiveTab("employees")}
    className={`rounded-lg px-5 py-2 font-medium transition ${
      activeTab === "employees"
        ? "bg-emerald-600 text-white"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`}
  >
    Employees
  </button>

  <button
    onClick={() => setActiveTab("attendance")}
    className={`rounded-lg px-5 py-2 font-medium transition ${
      activeTab === "attendance"
        ? "bg-emerald-600 text-white"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`}
  >
    Attendance
  </button>

  <button
  onClick={() => setActiveTab("leave")}
  className={`rounded-lg px-5 py-2 font-medium transition ${
    activeTab === "leave"
      ? "bg-emerald-600 text-white"
      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
  }`}
>
  Leave
</button>

</div>
        </div>

        <button
  onClick={() => {
    setSelectedEmployee(null);
    setIsEdit(false);
    setOpenDialog(true);
  }}
  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
>
  <Plus size={20} />
  Add Employee
</button>
      </div>

      {/* Summary Cards */}
{activeTab === "employees" && (
  <>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Staff"
          value={totalStaff}
          icon={<Users className="text-emerald-400" />}
        />

        <SummaryCard
          title="Active"
          value={activeStaff}
          icon={<UserCheck className="text-blue-400" />}
        />

        <SummaryCard
          title="On Leave"
          value={onLeave}
          icon={<UserMinus className="text-yellow-400" />}
        />

        <SummaryCard
          title="New This Month"
          value={newThisMonth}
          icon={<UserPlus className="text-pink-400" />}
        />
      </div>

      {/* Filters */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-3.5 text-slate-500"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white"
        >
          <option>All</option>
          <option>Manager</option>
          <option>Chef</option>
          <option>Cashier</option>
          <option>Waiter</option>
          <option>Receptionist</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white"
        >
          <option>All</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        {loading ? (
          <div className="py-20 text-center text-white">
            Loading...
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No employees found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
             <thead className="border-b border-slate-800 text-left text-slate-400">
  <tr>
    <th className="pb-4">Employee</th>
    <th className="pb-4">Role</th>
    <th className="pb-4">Phone</th>
    <th className="pb-4">Shift</th>
    <th className="pb-4">Salary</th>
    <th className="pb-4">Status</th>
    <th className="pb-4 text-center">Actions</th>
  </tr>
</thead>

              <tbody>
                {filteredStaff.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-slate-800"
                  >
                    <td className="py-5">
                      <div>
                        <p className="font-semibold text-white">
                          {employee.fullName}
                        </p>

                        <p className="text-sm text-slate-400">
                          {employee.employeeId}
                        </p>
                      </div>
                    </td>

                    <td className="text-white">
                      {employee.role}
                    </td>

                    <td className="text-white">
                      {employee.phone}
                    </td>

                    <td className="text-white">
                      {employee.shift}
                    </td>

                    <td className="font-semibold text-emerald-400">
                      ₹{Number(employee.salary).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                        {employee.status}
                      </span>
                    </td>
                    <td className="text-center">
  <div className="flex justify-center gap-2">

    <button
  onClick={() => handleEdit(employee)}
  className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700"
>
  Edit
</button>

    <button
  onClick={() => handleDelete(employee.id)}
  className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
>
  Delete
</button>

  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )}

  {activeTab === "attendance" && <AttendanceTab />}

{activeTab === "leave" && <LeaveTab />}
      <AddStaffDialog
  open={openDialog}
  employee={selectedEmployee}
  isEdit={isEdit}
  onClose={() => {
    setOpenDialog(false);
    setSelectedEmployee(null);
    setIsEdit(false);
  }}
  onSuccess={() => {
    fetchStaff();
    setOpenDialog(false);
    setSelectedEmployee(null);
    setIsEdit(false);
  }}
/>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        {icon}
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}