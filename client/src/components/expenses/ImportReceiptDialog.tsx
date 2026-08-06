"use client";

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, FileImage } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ImportReceiptDialog({
  open,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const handleChoose = () => {
    inputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-slate-900 border-slate-700 text-white">

        <DialogHeader>
          <DialogTitle>
            Import Receipt ✨
          </DialogTitle>
        </DialogHeader>

        <div
          onClick={handleChoose}
          className="cursor-pointer rounded-xl border-2 border-dashed border-slate-600 p-12 transition hover:border-emerald-500"
        >
          <div className="flex flex-col items-center">

            <Upload className="mb-4 h-12 w-12 text-emerald-400" />

            <h3 className="text-lg font-semibold">
              Upload Receipt
            </h3>

            <p className="mt-2 text-center text-sm text-slate-400">
              Drag & Drop or Click to select
            </p>

            <p className="mt-1 text-xs text-slate-500">
              JPG • PNG • PDF
            </p>

          </div>

          <input
            hidden
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </div>

        {file && (
          <div className="mt-5 rounded-lg bg-slate-800 p-4">

            <div className="flex items-center gap-3">

              <FileImage className="text-emerald-400" />

              <div>

                <p className="font-medium">
                  {file.name}
                </p>

                <p className="text-sm text-slate-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>

              </div>

            </div>

            <button
              className="mt-5 w-full rounded-lg bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-700"
            >
              Extract with AI
            </button>

          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}