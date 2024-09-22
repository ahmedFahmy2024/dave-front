import { Axios } from "./Axios";
import { BASE_URL, NOTES } from "./EndPoints";


export const fetchNotes = async () => {
    const response = await Axios.get(`${BASE_URL}${NOTES}`);
    return response.data;
}