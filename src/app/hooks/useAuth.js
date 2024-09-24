// hooks/useAuth.js file 
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthProvider";

const useAuthHooks = () => {
  const { auth } = useAuth();
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (auth?.accessToken) {
    const decoded = jwtDecode(auth.accessToken);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin}
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};

export default useAuthHooks;
