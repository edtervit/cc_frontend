import request from "./requests";

export function fetchMessages(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/messages`,
    query,
    signal
  ) as unknown as Promise<any>;
}

export function fetchColourSchemes(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/colour-schemes`,
    query,
    signal
  ) as unknown as Promise<any>;
}

export function fetchSubjects(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/subjects`,
    query,
    signal
  ) as unknown as Promise<any>;
}

export function fetchImages(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/images`,
    query,
    signal
  ) as unknown as Promise<any>;
}

export function fetchAllTopics(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/topics`,
    query,
    signal
  ) as unknown as Promise<any>;
}