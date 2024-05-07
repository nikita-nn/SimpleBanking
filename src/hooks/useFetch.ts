import { useCallback } from "react";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions<T> {
  data?: T | null;
  headers?: Record<string, string>;
  includeCredentials?: boolean;
}

interface Config extends RequestInit {
  headers: {
    "Content-Type": string;
    [key: string]: string;
  };
  body?: string;
}

const useFetch = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  };

  const request = useCallback(
    async <T>(
      method: FetchMethod,
      url: string,
      {
        data = null,
        headers = {},
        includeCredentials = true,
      }: FetchOptions<T> = {},
    ) => {
      const csrfToken = getCookie("csrftoken");
      const config: Config = {
        method,
        credentials: includeCredentials ? "include" : "omit", // Conditionally include credentials
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          ...headers,
        },
      };
      if (data) {
        if (method !== "GET") {
          config.body = JSON.stringify(data);
        } else {
          const params = new URLSearchParams();
          Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
              params.append(key, String(value));
            }
          });
          url += `?${params.toString()}`;
        }
      }

      const response = await fetch(url, config);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }
      return responseData;
    },
    [],
  );

  return {
    get: <T>(url: string, options?: FetchOptions<T>) =>
      request<T>("GET", url, options),
    post: <T>(url: string, options?: FetchOptions<T>) =>
      request<T>("POST", url, options),
    put: <T>(url: string, options?: FetchOptions<T>) =>
      request<T>("PUT", url, options),
    delete: <T>(url: string, options?: FetchOptions<T>) =>
      request<T>("DELETE", url, options),
  };
};

export default useFetch;
