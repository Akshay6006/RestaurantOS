"use client";

import { useEffect, useState } from "react";
import { getAttendance } from "@/services/attendance";
import MarkAttendanceDialog from "./MarkAttendanceDialog";

export default function AttendanceTab() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const data = await getAttendance();

      setAttendance(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const leave = attendance.filter(
    (a) => a.status === "Leave"
  ).length;

  const halfDay = attendance.filter(
    (a) => a.status === "Half Day"
  ).length;

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Attendance Management
          </h2>

          <p className="mt-2 text-slate-400">
            Mark and manage employee attendance.
          </p>
        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Mark Attendance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Present" value={present} color="text-green-400" />
        <Card title="Absent" value={absent} color="text-red-400" />
        <Card title="Leave" value={leave} color="text-yellow-400" />
        <Card title="Half Day" value={halfDay} color="text-blue-400" />
      </div>

      {/* Attendance Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        {loading ? (
          <div className="py-20 text-center text-white">
            Loading...
          </div>
        ) : attendance.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No attendance marked today.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-800 text-left text-slate-400">
              <tr>
                <th className="pb-4">Employee</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Check In</th>
                <th className="pb-4">Check Out</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-800"
                >
                  <td className="py-5 text-white">
                    {item.staff.fullName}
                  </td>

                  <td className="text-white">
                    {item.staff.role}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.status === "Present"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Absent"
                          ? "bg-red-500/20 text-red-400"
                          : item.status === "Leave"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="text-white">
                    {item.checkIn || "--"}
                  </td>

                  <td className="text-white">
                    {item.checkOut || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <MarkAttendanceDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={() => {
          fetchAttendance();
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