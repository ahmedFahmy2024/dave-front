import { Axios } from "./Axios";
import { BASE_URL, USERS } from "./EndPoints";

export const fetchUsers = async () => {
    const response = await Axios.get(`${BASE_URL}${USERS}`);
    return response.data;
}