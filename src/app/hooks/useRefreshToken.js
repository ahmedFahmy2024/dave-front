// useRefreshToken.js file

import { useAuth } from "../../context/AuthProvider";
import { Axios } from "../api/Axios";
import { REFRESH_TOKEN } from "../api/EndPoints";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await Axios.get(REFRESH_TOKEN, {
                withCredentials: true,
            });
            setAuth((prev) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { 
                    ...prev,
                    roles: response?.data?.roles,
                    accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (error) {
            console.log(error);
        }
    };

  return refresh;
};

export default useRefreshToken