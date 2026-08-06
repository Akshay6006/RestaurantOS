"use client";

import { useEffect, useState } from "react";
import {
  getLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "@/services/leave";

import ApplyLeaveDialog from "./ApplyLeaveDialog";

export default function LeaveTab() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const removeLeave = async (id: string) => {
    if (!confirm("Delete this leave request?")) return;

    try {
      await deleteLeave(id);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const pending = leaves.filter(
    (l) => l.status === "Pending"
  ).length;

  const approved = leaves.filter(
    (l) => l.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    (l) => l.status === "Rejected"
  ).length;

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Leave Management
          </h2>

          <p className="mt-2 text-slate-400">
            Manage employee leave requests.
          </p>
        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Apply Leave
        </button>
      </div>

      {/* Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card
          title="Pending"
          value={pending}
          color="text-yellow-400"
        />

        <Card
          title="Approved"
          value={approved}
          color="text-green-400"
        />

        <Card
          title="Rejected"
          value={rejected}
          color="text-red-400"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        {loading ? (
          <div className="py-20 text-center text-white">
            Loading...
          </div>
        ) : leaves.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No leave requests found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-800 text-left text-slate-400">
              <tr>
                <th className="pb-4">Employee</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">From</th>
                <th className="pb-4">To</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-5 text-white">
                    {leave.staff.fullName}
                  </td>

                  <td className="text-white">
                    {leave.leaveType}
                  </td>

                  <td className="text-white">
                    {new Date(
                      leave.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="text-white">
                    {new Date(
                      leave.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-500/20 text-green-400"
                          : leave.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(
                            leave.id,
                            "Approved"
                          )
                        }
                        className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            leave.id,
                            "Rejected"
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          removeLeave(leave.id)
                        }
                        className="rounded-lg bg-slate-700 px-3 py-2 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ApplyLeaveDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={() => {
          fetchLeaves();
          setOpenDialog(false);
        }}
      />
    </>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}