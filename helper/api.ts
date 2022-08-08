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

export function fetchSubjects(query?: Object, cancelToken?: CancelToken) {
  return request(
    `/api/subjects`,
    query,
    cancelToken
  ) as unknown as Promise<any>;
}

export function fetchImages(query?: Object, cancelToken?: CancelToken) {
  return request(
    `/api/images`,
    query,
    cancelToken
  ) as unknown as Promise<any>;
}