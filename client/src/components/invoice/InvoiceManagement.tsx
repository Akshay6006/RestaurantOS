"use client";

import { useState } from "react";

import {
  extractInvoice,
  saveInvoiceItems,
} from "@/services/invoice";

import {
  ExtractedInvoiceItem,
} from "@/types/invoice";

import InvoiceUploader from "./InvoiceUploader";
import InvoicePreview from "./InvoicePreview";
import ExtractedItemsTable from "./ExtractedItemsTable";

export default function InvoiceManagement() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [items, setItems] = useState<
    ExtractedInvoiceItem[]
  >([]);

  const handleFileSelect = (selected: File) => {
    setFile(selected);
    setItems([]);

    if (selected.type.startsWith("image")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview("");
    }
  };

  const handleExtract = async () => {
    if (!file) return;

    try {
      setExtracting(true);

      const response = await extractInvoice(file);

      setItems(response.items || []);
    } catch (error) {
      console.error(error);
      alert("Failed to extract invoice.");
    } finally {
      setExtracting(false);
    }
  };

  const handleSave = async () => {
    if (items.length === 0) return;

    try {
      setSaving(true);

      await saveInvoiceItems(items);

      alert("Inventory saved successfully.");

      setItems([]);
      setFile(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      alert("Failed to save inventory.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          AI Invoice Processing
        </h1>

        <p className="mt-2 text-gray-500">
          Upload supplier invoices and let AI
          automatically extract inventory items.
        </p>

      </div>

      <InvoiceUploader
        file={file}
        preview={preview}
        onFileSelect={handleFileSelect}
      />

      {file && (
        <InvoicePreview
          file={file}
          preview={preview}
          extracting={extracting}
          onExtract={handleExtract}
        />
      )}

      <ExtractedItemsTable
        items={items}
        setItems={setItems}
        onSave={handleSave}
        saving={saving}
      />

    </div>
  );
}