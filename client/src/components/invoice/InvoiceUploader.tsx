"use client";

import { Upload, FileText, ImageIcon } from "lucide-react";

interface Props {
  file: File | null;
  preview: string;
  onFileSelect: (file: File) => void;
}

export default function InvoiceUploader({
  file,
  preview,
  onFileSelect,
}: Props) {
  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selected = files[0];

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowed.includes(selected.type)) {
      alert("Please upload JPG, PNG or PDF.");
      return;
    }

    onFileSelect(selected);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-blue-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-blue-500 transition"
      >
        <Upload
          size={60}
          className="text-blue-600 mb-5"
        />

        <h2 className="text-2xl font-bold">
          Upload Supplier Invoice
        </h2>

        <p className="mt-3 text-gray-500">
          Drag & Drop your invoice here
        </p>

        <p className="text-gray-400 my-2">
          or
        </p>

        <label className="cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition">

          Browse Invoice

          <input
            type="file"
            hidden
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) =>
              handleFile(e.target.files)
            }
          />

        </label>

        <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <ImageIcon size={18} />
            JPG / PNG
          </div>

          <div className="flex items-center gap-2">
            <FileText size={18} />
            PDF
          </div>

        </div>

      </div>

      {file && (
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">

          <h3 className="font-semibold text-lg">
            Selected File
          </h3>

          <div className="mt-2 flex justify-between items-center">

            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <span className="rounded-full bg-green-100 text-green-700 px-4 py-1 text-sm font-semibold">
              Ready
            </span>

          </div>

        </div>
      )}

    </div>
  );
}