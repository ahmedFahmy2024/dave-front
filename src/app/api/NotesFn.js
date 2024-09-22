import { Axios } from "./Axios";
import { BASE_URL, NOTES } from "./EndPoints";


export const fetchNotes = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}${NOTES}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchNote = async (id) => {
    try {
        const response = await Axios.get(`${BASE_URL}${NOTES}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createNote = async (data) => {
    try {
        const response = await Axios.post(`${BASE_URL}${NOTES}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateNote = async ({ id, ...data }) => {
    console.log(data);
    console.log(id);
    try {
        const response = await Axios.patch(`${BASE_URL}${NOTES}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteNote = async (id) => {
    try {
        const response = await Axios.delete(`${BASE_URL}${NOTES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}