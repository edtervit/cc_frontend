import request from "./requests";
import {ColourScheme, GeneralMessage, Image, SubjectsData, Topic} from "./types";

export function fetchMessages(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/messages`,
    query,
    signal
  ) as unknown as Promise<GeneralMessage[]>;
}

export function fetchColourSchemes(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/colour-schemes`,
    query,
    signal
  ) as unknown as Promise<ColourScheme[]>;
}

export function fetchSubjects(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/subjects`,
    query,
    signal
  ) as unknown as Promise<SubjectsData[]>;
}

export function fetchImages(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/images`,
    query,
    signal
  ) as unknown as Promise<Image[]>;
}

export function fetchAllTopics(query?: Object, signal?: AbortSignal) {
  return request(
    `/api/topics`,
    query,
    signal
  ) as unknown as Promise<Topic[]>;
}