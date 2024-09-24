// usersFn.js file

import { USERS } from "./EndPoints";

export const fetchUsers = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(USERS);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchUser = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.get(`${USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createUser = async (axiosPrivate, data) => {
    try {
        const response = await axiosPrivate.post(`${USERS}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUser = async (axiosPrivate, { id, ...data }) => {
    try {
        const response = await axiosPrivate.patch(`${USERS}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUser = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

