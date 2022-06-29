import request from "./requests";
import { CancelToken } from "axios";

export function fetchMessages(query?: Object, cancelToken?: CancelToken) {
  return request(
    `/api/messages/photography`,
    query,
    cancelToken
  ) as unknown as Promise<any>;
}
