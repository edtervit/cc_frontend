import request from "./requests";
import { CancelToken } from "axios";

export function fetchMessages(query?: Object, cancelToken?: CancelToken) {
  return request(
    `/api/messages`,
    query,
    cancelToken
  ) as unknown as Promise<any>;
}

export function fetchColourSchemes(query?: Object, cancelToken?: CancelToken) {
  return request(
    `/api/colour-schemes`,
    query,
    cancelToken
  ) as unknown as Promise<any>;
}
