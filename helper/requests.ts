import axios, { Method } from "axios";
import camelcaseKeys from "camelcase-keys";

export const baseDomainName: string | undefined =
  process.env.NEXT_PUBLIC_BASE_BACKEND_URL; // Back-end url

// create an axios instance
const service = axios.create({
  baseURL: baseDomainName, // url = base url + request url
  timeout: 100000, // request timeout
});

service.interceptors.response.use((response) => {
  return camelcaseKeys(response.data, { deep: true });
});

export default function request(
  url: string,
  query?: object,
  signal?: AbortSignal,
  headers?: object,
  requestType?: Method
) {
  return service({
    url,
    params: query,
    signal: signal,
    headers: { ...headers },
    method: requestType ?? "GET",
  });
}
