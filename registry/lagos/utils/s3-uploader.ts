// ./registry/lagos/utils/s3-uploader.ts

export interface S3UploadResponse {
  success: boolean;
  file?: {
    key: string;
    url: string;
    name: string;
    size: number;
  };
  error?: string;
}

export class S3Uploader {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async uploadFile(file: File, folder = "uploads"): Promise<S3UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch(`${this.baseUrl}/api/s3/upload`, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      });

      const result = (await response.json()) as S3UploadResponse;
      return result;
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async uploadFiles(
    files: File[],
    folder = "uploads"
  ): Promise<S3UploadResponse[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("folder", folder);

      const response = await fetch(`${this.baseUrl}/api/s3/upload-multiple`, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      });

      const result = await response.json();
      return (result as { files: S3UploadResponse[] }).files || [];
    } catch (error) {
      return files.map(() => ({
        success: false,
        error: (error as Error).message,
      }));
    }
  }
}

// Create instance
const S3_UPLOADER_URL = process.env.NEXT_PUBLIC_MAIL_NOTIFIER_URL || "";
const S3_UPLOADER_KEY = process.env.NEXT_PUBLIC_MAIL_NOTIFIER_KEY || "";

export const s3Uploader = new S3Uploader(S3_UPLOADER_URL, S3_UPLOADER_KEY);
