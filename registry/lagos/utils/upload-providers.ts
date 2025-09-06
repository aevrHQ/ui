// ./registry/lagos/utils/upload-providers.ts

import {
  CloudinaryProvider,
  S3Provider,
  UploadProvider,
  UploadResponse,
} from "@/registry/lagos/ui/file-upload";

// ============================================================================
// Type Definitions
// ============================================================================

interface FirebaseStorage {
  ref: () => FirebaseStorageReference;
}

interface FirebaseStorageReference {
  child: (path: string) => FirebaseStorageReference;
  put: (
    file: File,
    metadata?: FirebaseUploadMetadata
  ) => Promise<FirebaseUploadTaskSnapshot>;
}

interface FirebaseUploadMetadata {
  contentType?: string;
  customMetadata?: Record<string, string>;
}

interface FirebaseUploadTaskSnapshot {
  ref: {
    getDownloadURL: () => Promise<string>;
    fullPath: string;
    name: string;
    bucket: string;
  };
  metadata: {
    size: number;
    timeCreated: string;
  };
}

interface PinataMetadata {
  name?: string;
  keyvalues?: Record<string, string | number | boolean>;
}

interface ImageKitOptions {
  fileName?: string;
  folder?: string;
  tags?: string[];
  customMetadata?: Record<string, string | number | boolean>;
}

interface BackblazeAuthResponse {
  authorizationToken: string;
  apiUrl: string;
}

interface BackblazeUploadUrlResponse {
  uploadUrl: string;
  authorizationToken: string;
}

interface BackblazeUploadResponse {
  fileId: string;
  fileName: string;
  accountId: string;
  bucketId: string;
  contentLength: number;
  uploadTimestamp: number;
  message?: string;
}

// ============================================================================
// Base64 Provider (for local storage/processing)
// ============================================================================

export class Base64Provider implements UploadProvider {
  name = "base64";

  async uploadFile(file: File): Promise<UploadResponse> {
    try {
      const base64 = await this.convertToBase64(file);
      return {
        success: true,
        data: {
          base64,
          dataUrl: `data:${file.type};base64,${base64}`,
          name: file.name,
          size: file.size,
          type: file.type,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
    });
  }
}

// ============================================================================
// Supabase Storage Provider
// ============================================================================

export class SupabaseProvider implements UploadProvider {
  name = "supabase";
  private supabaseUrl: string;
  private supabaseKey: string;
  private bucketName: string;

  constructor(supabaseUrl: string, supabaseKey: string, bucketName: string) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.bucketName = bucketName;
  }

  async uploadFile(
    file: File,
    options: { path?: string; upsert?: boolean } = {}
  ): Promise<UploadResponse> {
    try {
      const { path = `uploads/${Date.now()}-${file.name}`, upsert = false } =
        options;

      const response = await fetch(
        `${this.supabaseUrl}/storage/v1/object/${this.bucketName}/${path}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.supabaseKey}`,
            "Content-Type": file.type,
            "x-upsert": upsert.toString(),
          },
          body: file,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Upload failed",
        };
      }

      const publicUrl = `${this.supabaseUrl}/storage/v1/object/public/${this.bucketName}/${path}`;

      return {
        success: true,
        data: {
          path,
          fullPath: `${this.bucketName}/${path}`,
          publicUrl,
          name: file.name,
          size: file.size,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Firebase Storage Provider
// ============================================================================

export class FirebaseProvider implements UploadProvider {
  name = "firebase";
  private storage: FirebaseStorage;
  private bucketName?: string;

  constructor(firebaseStorage: FirebaseStorage, bucketName?: string) {
    this.storage = firebaseStorage;
    this.bucketName = bucketName;
  }

  async uploadFile(
    file: File,
    options: { path?: string; metadata?: Record<string, string> } = {}
  ): Promise<UploadResponse> {
    try {
      const { path = `uploads/${Date.now()}-${file.name}`, metadata = {} } =
        options;

      // Create a reference
      const storageRef = this.storage.ref();
      const fileRef = storageRef.child(path);

      // Upload the file
      const snapshot = await fileRef.put(file, {
        contentType: file.type,
        customMetadata: metadata,
      });

      // Get download URL
      const downloadURL = await snapshot.ref.getDownloadURL();

      return {
        success: true,
        data: {
          path,
          downloadURL,
          fullPath: snapshot.ref.fullPath,
          name: snapshot.ref.name,
          bucket: snapshot.ref.bucket,
          size: snapshot.metadata.size,
          timeCreated: snapshot.metadata.timeCreated,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Uploadcare Provider
// ============================================================================

export class UploadcareProvider implements UploadProvider {
  name = "uploadcare";
  private publicKey: string;

  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  async uploadFile(
    file: File,
    options: { store?: boolean; metadata?: Record<string, string> } = {}
  ): Promise<UploadResponse> {
    try {
      const { store = true, metadata = {} } = options;

      const formData = new FormData();
      formData.append("UPLOADCARE_PUB_KEY", this.publicKey);
      formData.append("UPLOADCARE_STORE", store ? "1" : "0");
      formData.append("file", file);

      // Add metadata
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(`metadata[${key}]`, value);
      });

      const response = await fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.content || "Upload failed",
        };
      }

      return {
        success: true,
        data: {
          uuid: data.file,
          cdnUrl: `https://ucarecdn.com/${data.file}/`,
          originalUrl: `https://ucarecdn.com/${data.file}/-/preview/`,
          name: file.name,
          size: file.size,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Pinata IPFS Provider
// ============================================================================

export class PinataProvider implements UploadProvider {
  name = "pinata";
  private apiKey: string;
  private secretKey: string;

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  async uploadFile(
    file: File,
    options: {
      metadata?: PinataMetadata;
    } = {}
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      if (options.metadata) {
        formData.append("pinataMetadata", JSON.stringify(options.metadata));
      }

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: this.apiKey,
            pinata_secret_api_key: this.secretKey,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Upload failed",
        };
      }

      return {
        success: true,
        data: {
          ipfsHash: data.IpfsHash,
          pinSize: data.PinSize,
          timestamp: data.Timestamp,
          gatewayUrl: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
          name: file.name,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// ImageKit Provider
// ============================================================================

export class ImageKitProvider implements UploadProvider {
  name = "imagekit";
  private endpoint: string;
  private publicKey: string;
  private authEndpoint: string;

  constructor(endpoint: string, publicKey: string, authEndpoint: string) {
    this.endpoint = endpoint;
    this.publicKey = publicKey;
    this.authEndpoint = authEndpoint;
  }

  async uploadFile(
    file: File,
    options: ImageKitOptions = {}
  ): Promise<UploadResponse> {
    try {
      // Get authentication parameters
      const authResponse = await fetch(this.authEndpoint);
      const authData = await authResponse.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", this.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      // Add optional parameters
      if (options.fileName) {
        formData.append("fileName", options.fileName);
      }
      if (options.folder) {
        formData.append("folder", options.folder);
      }
      if (options.tags && options.tags.length > 0) {
        formData.append("tags", options.tags.join(","));
      }
      if (options.customMetadata) {
        formData.append(
          "customMetadata",
          JSON.stringify(options.customMetadata)
        );
      }

      const response = await fetch(`${this.endpoint}/api/v1/files/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Upload failed",
        };
      }

      return {
        success: true,
        data: {
          fileId: data.fileId,
          name: data.name,
          url: data.url,
          thumbnailUrl: data.thumbnailUrl,
          filePath: data.filePath,
          size: data.size,
          fileType: data.fileType,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Backblaze B2 Provider
// ============================================================================

export class BackblazeProvider implements UploadProvider {
  name = "backblaze";
  private applicationKeyId: string;
  private applicationKey: string;
  private bucketId: string;

  constructor(
    applicationKeyId: string,
    applicationKey: string,
    bucketId: string
  ) {
    this.applicationKeyId = applicationKeyId;
    this.applicationKey = applicationKey;
    this.bucketId = bucketId;
  }

  async uploadFile(
    file: File,
    options: { fileName?: string; contentType?: string } = {}
  ): Promise<UploadResponse> {
    try {
      // First, get authorization
      const authResponse = await fetch(
        "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(
              `${this.applicationKeyId}:${this.applicationKey}`
            )}`,
          },
        }
      );

      if (!authResponse.ok) {
        throw new Error("Failed to authorize with Backblaze");
      }

      const authData: BackblazeAuthResponse = await authResponse.json();

      // Get upload URL
      const uploadUrlResponse = await fetch(
        `${authData.apiUrl}/b2api/v2/b2_get_upload_url`,
        {
          method: "POST",
          headers: {
            Authorization: authData.authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bucketId: this.bucketId,
          }),
        }
      );

      const uploadUrlData: BackblazeUploadUrlResponse =
        await uploadUrlResponse.json();

      // Upload file
      const fileName = options.fileName || file.name;
      const contentType = options.contentType || file.type;

      const uploadResponse = await fetch(uploadUrlData.uploadUrl, {
        method: "POST",
        headers: {
          Authorization: uploadUrlData.authorizationToken,
          "X-Bz-File-Name": fileName,
          "Content-Type": contentType,
          "X-Bz-Content-Sha1": "unverified",
        },
        body: file,
      });

      const uploadData: BackblazeUploadResponse = await uploadResponse.json();

      if (!uploadResponse.ok) {
        return {
          success: false,
          error: uploadData.message || "Upload failed",
        };
      }

      return {
        success: true,
        data: {
          fileId: uploadData.fileId,
          fileName: uploadData.fileName,
          accountId: uploadData.accountId,
          bucketId: uploadData.bucketId,
          contentLength: uploadData.contentLength,
          uploadTimestamp: uploadData.uploadTimestamp,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Provider Factory and Helpers
// ============================================================================

export interface ProviderConfig {
  type:
    | "s3"
    | "cloudinary"
    | "supabase"
    | "firebase"
    | "uploadcare"
    | "pinata"
    | "imagekit"
    | "backblaze"
    | "base64"
    | "custom";
  config: Record<string, unknown>;
}

// Import types for dynamic imports
type S3ProviderClass = typeof import("../ui/file-upload").S3Provider;
type CloudinaryProviderClass =
  typeof import("../ui/file-upload").CloudinaryProvider;
type CustomAPIProviderClass =
  typeof import("../ui/file-upload").CustomAPIProvider;

export class ProviderFactory {
  static async create(providerConfig: ProviderConfig): Promise<UploadProvider> {
    switch (providerConfig.type) {
      case "s3": {
        const { S3Provider } = await import("../ui/file-upload");
        return new (S3Provider as unknown as S3ProviderClass)(
          providerConfig.config.baseUrl as string,
          providerConfig.config.apiKey as string
        );
      }

      case "cloudinary": {
        const { CloudinaryProvider } = await import("../ui/file-upload");
        return new (CloudinaryProvider as unknown as CloudinaryProviderClass)(
          providerConfig.config.cloudName as string,
          providerConfig.config.apiKey as string
        );
      }

      case "supabase":
        return new SupabaseProvider(
          providerConfig.config.supabaseUrl as string,
          providerConfig.config.supabaseKey as string,
          providerConfig.config.bucketName as string
        );

      case "firebase":
        return new FirebaseProvider(
          providerConfig.config.storage as FirebaseStorage,
          providerConfig.config.bucketName as string | undefined
        );

      case "uploadcare":
        return new UploadcareProvider(
          providerConfig.config.publicKey as string
        );

      case "pinata":
        return new PinataProvider(
          providerConfig.config.apiKey as string,
          providerConfig.config.secretKey as string
        );

      case "imagekit":
        return new ImageKitProvider(
          providerConfig.config.endpoint as string,
          providerConfig.config.publicKey as string,
          providerConfig.config.authEndpoint as string
        );

      case "backblaze":
        return new BackblazeProvider(
          providerConfig.config.applicationKeyId as string,
          providerConfig.config.applicationKey as string,
          providerConfig.config.bucketId as string
        );

      case "base64":
        return new Base64Provider();

      case "custom": {
        const { CustomAPIProvider } = await import("../ui/file-upload");
        return new (CustomAPIProvider as unknown as CustomAPIProviderClass)(
          providerConfig.config.endpoint as string,
          providerConfig.config.headers as Record<string, string>
        );
      }

      default:
        throw new Error(`Unsupported provider type: ${providerConfig.type}`);
    }
  }
}

// ============================================================================
// Multi-Provider Upload (for redundancy/backup)
// ============================================================================

export class MultiProvider implements UploadProvider {
  name = "multi";
  private providers: UploadProvider[];
  private strategy: "all" | "first-success" | "primary-fallback";
  private primaryIndex: number;

  constructor(
    providers: UploadProvider[],
    strategy: "all" | "first-success" | "primary-fallback" = "first-success",
    primaryIndex: number = 0
  ) {
    this.providers = providers;
    this.strategy = strategy;
    this.primaryIndex = primaryIndex;
  }

  async uploadFile(
    file: File,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    switch (this.strategy) {
      case "all":
        return this.uploadToAll(file, options);
      case "first-success":
        return this.uploadFirstSuccess(file, options);
      case "primary-fallback":
        return this.uploadPrimaryFallback(file, options);
      default:
        return this.uploadFirstSuccess(file, options);
    }
  }

  private async uploadToAll(
    file: File,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    const results = await Promise.allSettled(
      this.providers.map((provider) => provider.uploadFile(file, options))
    );

    const successful = results
      .filter(
        (result): result is PromiseFulfilledResult<UploadResponse> =>
          result.status === "fulfilled" && result.value.success
      )
      .map((result) => result.value);

    const failed = results.filter(
      (
        result
      ): result is
        | PromiseRejectedResult
        | PromiseFulfilledResult<UploadResponse> =>
        result.status === "rejected" ||
        (result.status === "fulfilled" && !result.value.success)
    );

    if (successful.length === 0) {
      return {
        success: false,
        error: `All providers failed: ${failed
          .map((r) =>
            r.status === "rejected"
              ? r.reason
              : (r as PromiseFulfilledResult<UploadResponse>).value.error
          )
          .join(", ")}`,
      };
    }

    return {
      success: true,
      data: {
        results: successful.map((result) => result.data),
        primary: successful[0].data,
        successCount: successful.length,
        failureCount: failed.length,
      },
    };
  }

  private async uploadFirstSuccess(
    file: File,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    const errors: string[] = [];

    for (const provider of this.providers) {
      try {
        const result = await provider.uploadFile(file, options);
        if (result.success) {
          return result;
        }
        errors.push(`${provider.name}: ${result.error}`);
      } catch (error) {
        errors.push(`${provider.name}: ${(error as Error).message}`);
      }
    }

    return {
      success: false,
      error: `All providers failed: ${errors.join(", ")}`,
    };
  }

  private async uploadPrimaryFallback(
    file: File,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    const primary = this.providers[this.primaryIndex];
    if (!primary) {
      return {
        success: false,
        error: "No primary provider configured",
      };
    }

    try {
      const result = await primary.uploadFile(file, options);
      if (result.success) {
        return result;
      }
    } catch {
      // Continue to fallback - removed unused error parameter
    }

    // Try other providers as fallback
    const fallbackProviders = this.providers.filter(
      (_, index) => index !== this.primaryIndex
    );
    return this.uploadFirstSuccessFromProviders(
      fallbackProviders,
      file,
      options
    );
  }

  private async uploadFirstSuccessFromProviders(
    providers: UploadProvider[],
    file: File,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    const errors: string[] = [];

    for (const provider of providers) {
      try {
        const result = await provider.uploadFile(file, options);
        if (result.success) {
          return result;
        }
        errors.push(`${provider.name}: ${result.error}`);
      } catch (error) {
        errors.push(`${provider.name}: ${(error as Error).message}`);
      }
    }

    return {
      success: false,
      error: `All fallback providers failed: ${errors.join(", ")}`,
    };
  }
}

// ============================================================================
// Upload Queue Manager (for handling multiple files efficiently)
// ============================================================================

export class UploadQueue {
  private queue: Array<{
    file: File;
    provider: UploadProvider;
    options?: Record<string, unknown>;
    resolve: (value: UploadResponse) => void;
    reject: (error: Error) => void;
  }> = [];
  private isProcessing = false;
  private concurrency = 3;
  private activeUploads = 0;

  constructor(concurrency = 3) {
    this.concurrency = concurrency;
  }

  async add(
    file: File,
    provider: UploadProvider,
    options?: Record<string, unknown>
  ): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      this.queue.push({ file, provider, options, resolve, reject });
      this.process();
    });
  }

  private async process() {
    if (this.isProcessing || this.activeUploads >= this.concurrency) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0 && this.activeUploads < this.concurrency) {
      const item = this.queue.shift();
      if (item) {
        this.activeUploads++;
        this.processItem(item);
      }
    }

    this.isProcessing = false;
  }

  private async processItem(item: {
    file: File;
    provider: UploadProvider;
    options?: Record<string, unknown>;
    resolve: (value: UploadResponse) => void;
    reject: (error: Error) => void;
  }) {
    try {
      const result = await item.provider.uploadFile(item.file, item.options);
      item.resolve(result);
    } catch (error) {
      item.reject(error as Error);
    } finally {
      this.activeUploads--;
      // Continue processing if there are more items
      if (this.queue.length > 0) {
        this.process();
      }
    }
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  getActiveUploads(): number {
    return this.activeUploads;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

export const createProviderFromEnv = (type: string): UploadProvider | null => {
  switch (type.toLowerCase()) {
    case "s3":
      if (
        process.env.NEXT_PUBLIC_S3_ENDPOINT &&
        process.env.NEXT_PUBLIC_S3_API_KEY
      ) {
        return new S3Provider(
          process.env.NEXT_PUBLIC_S3_ENDPOINT,
          process.env.NEXT_PUBLIC_S3_API_KEY
        ) as UploadProvider;
      }
      break;

    case "cloudinary":
      if (
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
      ) {
        return new CloudinaryProvider(
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
        ) as UploadProvider;
      }
      break;

    case "supabase":
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        return new SupabaseProvider(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "uploads"
        );
      }
      break;

    default:
      return null;
  }

  return null;
};
