// axios.js file

import axios from "axios";
import { BASE_URL } from "./EndPoints";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
