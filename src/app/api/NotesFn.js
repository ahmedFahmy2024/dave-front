import { NOTES } from "./EndPoints";

export const fetchNotes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(NOTES);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchNote = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.get(`${NOTES}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createNote = async (axiosPrivate, data) => {
    try {
        const response = await axiosPrivate.post(`${NOTES}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateNote = async (axiosPrivate, { id, ...data }) => {
    console.log(data);
    console.log(id);
    try {
        const response = await axiosPrivate.patch(`${NOTES}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteNote = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${NOTES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}