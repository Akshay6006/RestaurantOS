"use client";

import { useEffect, useState } from "react";
import { createAttendance } from "@/services/attendance";
import { getStaff } from "@/services/staff";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MarkAttendanceDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    staffId: "",
    date: new Date().toISOString().substring(0, 10),
    status: "Present",
    checkIn: "",
    checkOut: "",
    remarks: "",
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    const data = await getStaff();
    setStaff(data);
  };

  const handleSubmit = async () => {
    if (!form.staffId) {
      alert("Please select an employee.");
      return;
    }

    try {
      setLoading(true);

      await createAttendance(form);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      if ((error as any)?.response?.data?.message) {
  alert((error as any).response.data.message);
} else {
  alert("Failed to mark attendance.");
}
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-xl">

        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div>
            <Label>Employee</Label>

            <select
              className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
              value={form.staffId}
              onChange={(e) =>
                setForm({
                  ...form,
                  staffId: e.target.value,
                })
              }
            >
              <option value="">Select Employee</option>

              {staff.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.fullName} ({employee.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Status</Label>

            <select
              className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Leave</option>
              <option>Half Day</option>
            </select>
          </div>

          <div>
            <Label>Check In</Label>

            <Input
              type="time"
              value={form.checkIn}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkIn: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Check Out</Label>

            <Input
              type="time"
              value={form.checkOut}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkOut: e.target.value,
                })
              }
            />
          </div>

        </div>

        <DialogFooter className="mt-6">

          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 bg-slate-900 text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Mark Attendance"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}