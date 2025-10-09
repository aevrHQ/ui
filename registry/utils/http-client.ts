// httpClient.ts

/**
 * Generic HTTP Client
 * A flexible, lightweight HTTP client built on fetch API
 * Supports custom headers, retries, timeouts, and both structured/raw responses
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  meta?: Record<string, unknown>;
}

export type HttpResponse<T = unknown> = ApiResponse<T> | T;

export interface HttpClientConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  defaultResponseFormat?: "structured" | "raw" | "auto";
  retries?: number;
  retryDelay?: number;
  retryOnStatus?: number[];
  onRequest?: (url: string, options: RequestInit) => void | Promise<void>;
  onResponse?: (response: Response) => void | Promise<void>;
  onError?: (error: ApiError) => void | Promise<void>;
}

export class ApiError extends Error {
  public statusCode?: number;
  public code?: string;
  public details?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// Type guard to check if response is in ApiResponse format
export function isApiResponse<T>(
  response: unknown
): response is ApiResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    "data" in response &&
    "message" in response &&
    typeof response.success === "boolean" &&
    typeof response.message === "string"
  );
}

// Type guard to check if response is a structured error
export function isStructuredError(data: unknown): boolean {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    data.success === false &&
    "message" in data
  );
}

export class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private timeout: number;
  private defaultResponseFormat: "structured" | "raw" | "auto";
  private retries: number;
  private retryDelay: number;
  private retryOnStatus: number[];
  private onRequest?: (
    url: string,
    options: RequestInit
  ) => void | Promise<void>;
  private onResponse?: (response: Response) => void | Promise<void>;
  private onError?: (error: ApiError) => void | Promise<void>;

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = (config.baseUrl || "").replace(/\/$/, "");
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    this.timeout = config.timeout || 30000; // 30 seconds default
    this.defaultResponseFormat = config.defaultResponseFormat || "auto";
    this.retries = config.retries || 0;
    this.retryDelay = config.retryDelay || 1000;
    this.retryOnStatus = config.retryOnStatus || [408, 429, 500, 502, 503, 504];
    this.onRequest = config.onRequest;
    this.onResponse = config.onResponse;
    this.onError = config.onError;
  }

  /**
   * Set a header value
   */
  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  /**
   * Remove a header
   */
  removeHeader(key: string): void {
    delete this.headers[key];
  }

  /**
   * Set multiple headers at once
   */
  setHeaders(headers: Record<string, string>): void {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * Get all current headers
   */
  getHeaders(): Record<string, string> {
    return { ...this.headers };
  }

  /**
   * Clear all headers except Content-Type
   */
  clearHeaders(): void {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private async executeWithRetries<T>(
    requestFn: () => Promise<T>,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt <= this.retries && this.shouldRetry(error)) {
        await this.delay(this.retryDelay * attempt);
        return this.executeWithRetries(requestFn, attempt + 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof ApiError) {
      return (
        error.code === "NETWORK_ERROR" ||
        error.code === "TIMEOUT" ||
        (error.statusCode !== undefined &&
          this.retryOnStatus.includes(error.statusCode))
      );
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Main HTTP request method
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    responseFormat: "structured" | "raw" | "auto" = this.defaultResponseFormat
  ): Promise<HttpResponse<T>> {
    return this.executeWithRetries(async () => {
      const url = endpoint.startsWith("http")
        ? endpoint
        : `${this.baseUrl}${endpoint}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const requestOptions: RequestInit = {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        signal: controller.signal,
      };

      try {
        // Call onRequest hook if provided
        if (this.onRequest) {
          await this.onRequest(url, requestOptions);
        }

        const response = await fetch(url, requestOptions);

        clearTimeout(timeoutId);

        // Call onResponse hook if provided
        if (this.onResponse) {
          await this.onResponse(response);
        }

        const data: unknown = await response.json();

        if (!response.ok) {
          const error = this.parseError(
            data,
            response.status,
            response.statusText
          );

          // Call onError hook if provided
          if (this.onError) {
            await this.onError(error);
          }

          throw error;
        }

        // Return response based on format preference
        if (responseFormat === "raw" && isApiResponse<T>(data)) {
          return data.data;
        } else if (responseFormat === "structured" && !isApiResponse<T>(data)) {
          return {
            success: true,
            data: data as T,
            message: "Success",
            meta: {},
          };
        }

        return data as HttpResponse<T>;
      } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof ApiError) {
          throw error;
        }

        if (
          typeof error === "object" &&
          error !== null &&
          "name" in error &&
          error.name === "AbortError"
        ) {
          const timeoutError = new ApiError("Request timeout", 408, "TIMEOUT");
          if (this.onError) {
            await this.onError(timeoutError);
          }
          throw timeoutError;
        }

        const networkError = new ApiError(
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof error.message === "string"
            ? error.message
            : "Network error occurred",
          0,
          "NETWORK_ERROR",
          error
        );

        if (this.onError) {
          await this.onError(networkError);
        }

        throw networkError;
      }
    });
  }

  private parseError(
    data: unknown,
    status: number,
    statusText: string
  ): ApiError {
    let errorMessage = `HTTP ${status}: ${statusText}`;
    let errorCode: string | undefined = undefined;
    let errorDetails: unknown = data;

    if (isStructuredError(data)) {
      const structuredData = data as {
        message?: string;
        meta?: { code?: string; errorCode?: string; [key: string]: unknown };
        data?: unknown;
      };

      errorMessage = structuredData.message || errorMessage;
      errorCode = structuredData.meta?.code || structuredData.meta?.errorCode;
      errorDetails = structuredData.data || structuredData.meta || data;
    } else if (typeof data === "object" && data !== null && "error" in data) {
      const errorData = data as {
        error: {
          message?: string;
          code?: string;
          details?: {
            errors?: string[];
            [key: string]: unknown;
          };
        };
      };

      if (
        errorData.error.message &&
        typeof errorData.error.message === "string"
      ) {
        errorMessage = errorData.error.message;
      }

      if (errorData.error.code) {
        errorCode = errorData.error.code;
      }

      if (
        errorData.error.details?.errors &&
        Array.isArray(errorData.error.details.errors)
      ) {
        const validationErrors = errorData.error.details.errors.join(". ");
        errorMessage = `${errorMessage}: ${validationErrors}`;
      }

      errorDetails = errorData.error.details || data;
    } else if (typeof data === "string") {
      errorMessage = data;
    }

    return new ApiError(errorMessage, status, errorCode, errorDetails);
  }

  /**
   * Convenience method for structured responses
   */
  async requestStructured<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const response = await this.request<T>(endpoint, options, "auto");

    if (isApiResponse<T>(response)) {
      return response;
    }

    return {
      success: true,
      data: response as T,
      message: "Success",
      meta: {},
    };
  }

  /**
   * Convenience method for raw responses
   */
  async requestRaw<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await this.request<T>(endpoint, options, "auto");

    if (isApiResponse<T>(response)) {
      return response.data;
    }

    return response as T;
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | null | undefined>,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.request<T>(url, {
      method: "GET",
      ...options,
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    body?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * Update client configuration
   */
  updateConfig(config: Partial<HttpClientConfig>): void {
    if (config.baseUrl !== undefined) {
      this.baseUrl = config.baseUrl.replace(/\/$/, "");
    }
    if (config.headers) {
      this.headers = {
        ...this.headers,
        ...config.headers,
      };
    }
    if (config.timeout !== undefined) {
      this.timeout = config.timeout;
    }
    if (config.defaultResponseFormat !== undefined) {
      this.defaultResponseFormat = config.defaultResponseFormat;
    }
    if (config.retries !== undefined) {
      this.retries = config.retries;
    }
    if (config.retryDelay !== undefined) {
      this.retryDelay = config.retryDelay;
    }
    if (config.retryOnStatus !== undefined) {
      this.retryOnStatus = config.retryOnStatus;
    }
    if (config.onRequest !== undefined) {
      this.onRequest = config.onRequest;
    }
    if (config.onResponse !== undefined) {
      this.onResponse = config.onResponse;
    }
    if (config.onError !== undefined) {
      this.onError = config.onError;
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): HttpClientConfig {
    return {
      baseUrl: this.baseUrl,
      headers: { ...this.headers },
      timeout: this.timeout,
      defaultResponseFormat: this.defaultResponseFormat,
      retries: this.retries,
      retryDelay: this.retryDelay,
      retryOnStatus: [...this.retryOnStatus],
    };
  }
}

/**
 * Factory function to create pre-configured clients for common patterns
 */
export const createHttpClient = {
  /**
   * Standard client with Authorization header
   */
  withAuth(token: string, config?: HttpClientConfig): HttpClient {
    return new HttpClient({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        ...config?.headers,
      },
    });
  },

  /**
   * Client with API key
   */
  withApiKey(
    apiKey: string,
    headerName: string = "X-API-Key",
    config?: HttpClientConfig
  ): HttpClient {
    return new HttpClient({
      ...config,
      headers: {
        [headerName]: apiKey,
        ...config?.headers,
      },
    });
  },

  /**
   * Client with custom auth headers (like your original setup)
   */
  withCustomAuth(
    authToken: string,
    appId?: string,
    config?: HttpClientConfig
  ): HttpClient {
    const headers: Record<string, string> = {
      "auth-token": authToken,
      ...config?.headers,
    };

    if (appId) {
      headers["app-id"] = appId;
    }

    return new HttpClient({
      ...config,
      headers,
    });
  },

  /**
   * Client with basic auth
   */
  withBasicAuth(
    username: string,
    password: string,
    config?: HttpClientConfig
  ): HttpClient {
    const credentials = btoa(`${username}:${password}`);
    return new HttpClient({
      ...config,
      headers: {
        Authorization: `Basic ${credentials}`,
        ...config?.headers,
      },
    });
  },
};
