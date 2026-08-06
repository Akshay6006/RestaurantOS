"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Wallet, CalendarDays, Receipt, IndianRupee } from "lucide-react";

import {
  getExpenses,
  extractExpenseReceipt,
} from "@/services/expense";
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

const [initialExpenseData, setInitialExpenseData] = useState<any>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReceiptUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setAiLoading(true);

    const response = await extractExpenseReceipt(file);

    const data = response.data;

    setInitialExpenseData({
      title:
        data.vendor ||
        data.category ||
        "Imported Expense",

      category: data.category || "Miscellaneous",

      amount: data.amount || "",

      paymentMethod:
        data.paymentMethod || "",

      vendor: data.vendor || "",

      expenseDate: data.expenseDate
        ? data.expenseDate.split("T")[0]
        : "",

      notes:
        data.invoiceNumber
          ? `Invoice: ${data.invoiceNumber}`
          : "",
    });

    setOpenDialog(true);
  } catch (err) {
    console.error(err);
    alert("Failed to extract receipt.");
  } finally {
    setAiLoading(false);

    e.target.value = "";
  }
};

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );
  }, [expenses]);

  const thisMonthExpense = useMemo(() => {
    const now = new Date();

    return expenses
      .filter((expense) => {
        const date = new Date(expense.expenseDate);

        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  const todayExpense = useMemo(() => {
    const today = new Date().toDateString();

    return expenses
      .filter(
        (expense) =>
          new Date(expense.expenseDate).toDateString() === today
      )
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <input
  id="receipt-upload"
  type="file"
  accept="image/*,.pdf"
  className="hidden"
  onChange={handleReceiptUpload}
/>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Expenses</h1>

          <p className="mt-2 text-slate-400">
            Track and manage restaurant expenses.
          </p>
        </div>

        <div className="flex items-center gap-3">
<button
  onClick={() =>
    document.getElementById("receipt-upload")?.click()
  }
  disabled={aiLoading}
  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-white transition hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-50"
>
  {aiLoading ? "Extracting..." : "✨ Import Receipt"}
</button>

  <button
    onClick={() => setOpenDialog(true)}
    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
  >
    <Plus size={20} />
    Add Expense
  </button>
</div>
      </div>

      {/* Summary Cards */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <Wallet className="text-emerald-400" />
          </div>

          <p className="text-sm text-slate-400">
            Total Expense
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹{totalExpense.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <CalendarDays className="text-blue-400" />
          </div>

          <p className="text-sm text-slate-400">
            This Month
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹{thisMonthExpense.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <IndianRupee className="text-yellow-400" />
          </div>

          <p className="text-sm text-slate-400">
            Today
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            ₹{todayExpense.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <Receipt className="text-pink-400" />
          </div>

          <p className="text-sm text-slate-400">
            Transactions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {expenses.length}
          </h2>
        </div>

      </div>

      {/* Expense List */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        {loading ? (
          <div className="py-20 text-center text-white">
            Loading...
          </div>
        ) : expenses.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No expenses found.
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense: any) => (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-4"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {expense.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {expense.category}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-400">
                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                  </p>

                  <p className="text-sm text-slate-400">
                    {new Date(expense.expenseDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddExpenseDialog
  open={openDialog}
  onClose={() => {
    setOpenDialog(false);
    setInitialExpenseData(null);
  }}
  onSuccess={fetchExpenses}
  initialData={initialExpenseData}
/>
    </main>
  );
}