"use client";

import { FileText, Sparkles } from "lucide-react";

interface Props {
  file: File | null;
  preview: string;
  extracting: boolean;
  onExtract: () => void;
}

export default function InvoicePreview({
  file,
  preview,
  extracting,
  onExtract,
}: Props) {
  if (!file) return null;

  const isPdf = file.type === "application/pdf";

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div>
          <h2 className="text-2xl font-bold">
            Invoice Preview
          </h2>

          <p className="mt-1 text-gray-500">
            Review your invoice before AI extraction.
          </p>
        </div>

        <button
          onClick={onExtract}
          disabled={extracting}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Sparkles size={18} />

          {extracting
            ? "Extracting..."
            : "Extract using AI"}
        </button>

      </div>

      <div className="p-6">

        {isPdf ? (
          <div className="flex h-[500px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gray-50">

            <FileText
              size={80}
              className="text-red-500"
            />

            <h3 className="mt-4 text-xl font-semibold">
              PDF Invoice
            </h3>

            <p className="mt-2 text-gray-500">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <p className="mt-6 text-center text-sm text-gray-500">
              Gemini AI will read the PDF and extract
              all inventory items automatically.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border">

            <img
              src={preview}
              alt="Invoice Preview"
              className="max-h-[650px] w-full object-contain"
            />

          </div>
        )}

      </div>

      {extracting && (
        <div className="border-t bg-blue-50 p-6">

          <div className="mb-4 flex items-center justify-between">

            <span className="font-semibold">
              AI is analyzing your invoice...
            </span>

            <span className="text-blue-600">
              Please wait
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-blue-100">

            <div className="h-full w-full animate-pulse rounded-full bg-blue-600" />

          </div>

        </div>
      )}

    </div>
  );
}