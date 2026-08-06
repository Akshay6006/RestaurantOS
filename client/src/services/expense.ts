import API from "./api";

export const getExpenses = async () => {
  const { data } = await API.get("/expenses");
  return data;
};

export const createExpense = async (expense: any) => {
  const { data } = await API.post("/expenses", expense);
  return data;
};

export const extractExpenseReceipt = async (file: File) => {
  const formData = new FormData();

  formData.append("receipt", file);

  const { data } = await API.post(
    "/expenses/extract-ai",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};