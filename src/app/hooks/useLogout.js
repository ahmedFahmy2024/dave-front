import {Axios} from "../api/Axios";
import { useAuth } from "../../context/AuthProvider";
import { LOGOUT_URL } from "../api/EndPoints";
import toast from "react-hot-toast";

const useLogout = () => {
  const { setAuth, setPersist  } = useAuth();

  const logout = async () => {
    setAuth({});
    setPersist(false);
    localStorage.removeItem("persist");
    try {
      const response = await Axios.post(LOGOUT_URL, {}, {
        withCredentials: true,
      });
      console.log(response);
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
