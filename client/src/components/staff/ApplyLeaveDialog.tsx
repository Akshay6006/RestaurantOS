"use client";

import { useEffect, useState } from "react";
import { getStaff } from "@/services/staff";
import { createLeave } from "@/services/leave";

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

export default function ApplyLeaveDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    staffId: "",
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const data = await getStaff();
      setStaff(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (
      !form.staffId ||
      !form.startDate ||
      !form.endDate ||
      !form.reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createLeave(form);

      onSuccess();
      onClose();

      setForm({
        staffId: "",
        leaveType: "Casual",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to apply leave."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl border-slate-800 bg-slate-950 text-white">

        <DialogHeader>
          <DialogTitle>Apply Leave</DialogTitle>
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

              {staff.map((emp) => (
                <option
                  key={emp.id}
                  value={emp.id}
                >
                  {emp.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Leave Type</Label>

            <select
              className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3"
              value={form.leaveType}
              onChange={(e) =>
                setForm({
                  ...form,
                  leaveType: e.target.value,
                })
              }
            >
              <option>Casual</option>
              <option>Sick</option>
              <option>Earned</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>Start Date</Label>

              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>End Date</Label>

              <Input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <div>
            <Label>Reason</Label>

            <textarea
              className="mt-2 h-28 w-full rounded-md border border-slate-700 bg-slate-900 p-3"
              value={form.reason}
              onChange={(e) =>
                setForm({
                  ...form,
                  reason: e.target.value,
                })
              }
            />
          </div>

        </div>

        <DialogFooter>

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
            {loading ? "Applying..." : "Apply Leave"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}