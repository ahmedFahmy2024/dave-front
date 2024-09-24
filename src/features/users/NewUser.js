import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../app/api/UsersFn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { toast } from 'react-hot-toast';
import useAxiosPrivate from "../../app/hooks/useAxiosPrivate";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const mutation = useMutation({
    mutationFn: (data) => createUser(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
      // Reset form fields
      setUsername("");
      setPassword("");
      setRoles(["Employee"]);
      setErrorMsg("");

      navigate("/dash/users");
    },
    onError: (error) => {
      if (!error?.response) {
        setErrorMsg("No Server Response");
        toast.error("No Server Response");
      } else if (error.response?.status === 409) {
        setErrorMsg("Username Taken");
        toast.error("Username Taken");
      } else {
        setErrorMsg("Registration Failed");
        toast.error("Registration Failed");
      }
    },
  });

  const errClass = mutation.isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) &&
    !mutation.isPending;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
      roles,
    };

    if (canSave) {
      try {
        await mutation.mutateAsync(body);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <p className={errClass}>{errorMsg?.data?.message}</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewUser;
