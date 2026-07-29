import API from "./api";
import {
  InvoiceExtractionResponse,
} from "@/types/invoice";

// Upload invoice
export const uploadInvoice = async (file: File) => {
  const formData = new FormData();

  formData.append("invoice", file);

  const { data } = await API.post(
    "/invoice/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// Extract invoice using Gemini
export const extractInvoice = async (file: File) => {
  const formData = new FormData();

  formData.append("invoice", file);

  const { data } =
    await API.post<InvoiceExtractionResponse>(
      "/invoice/extract",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return data;
};

// Save extracted items into inventory
export const saveInvoiceItems = async (
  items: any[]
) => {
  const { data } = await API.post(
    "/invoice/save",
    {
      items,
    }
  );

  return data;
};