export interface ExtractedInvoiceItem {
  id?: string;

  name: string;

  category: string;

  quantity: number;

  unit: string;

  purchasePrice: number;

  supplier?: string;

  warehouse?: string;

  confidence?: number;
}

export interface InvoiceExtractionResponse {
  success: boolean;

  message: string;

  items: ExtractedInvoiceItem[];

  rawText?: string;
}

export interface InvoiceUploadResponse {
  success: boolean;

  message: string;

  imageUrl: string;

  fileName: string;
}

export interface InvoiceState {
  file: File | null;

  preview: string;

  loading: boolean;

  extracting: boolean;

  items: ExtractedInvoiceItem[];
}