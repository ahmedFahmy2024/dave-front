import { Axios } from "./Axios";
import { BASE_URL, USERS } from "./EndPoints";

export const fetchUsers = async () => {
    try {
        const response = await Axios.get(`${BASE_URL}${USERS}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchUser = async (id) => {
    try {
        const response = await Axios.get(`${BASE_URL}${USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createUser = async (data) => {
    try {
        const response = await Axios.post(`${BASE_URL}${USERS}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUser = async ({ id, ...data }) => {
    try {
        const response = await Axios.patch(`${BASE_URL}${USERS}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await Axios.delete(`${BASE_URL}${USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

