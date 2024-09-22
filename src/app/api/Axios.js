import axios from "axios";
import { BASE_URL } from "./EndPoints";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

