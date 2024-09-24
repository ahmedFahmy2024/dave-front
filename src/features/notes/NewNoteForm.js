import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../app/api/NotesFn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-hot-toast';
import useAxiosPrivate from "../../app/hooks/useAxiosPrivate";

const NewNoteForm = ({ users }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0]._id);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => createNote(axiosPrivate, data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        toast.success('Note created successfully!');
      // Reset form fields
      setTitle("");
      setText("");
      setUserId(users[0]._id);
      setErrorMsg("");

      navigate("/dash/notes");
    },
    onError: (error) => {
      console.log("error", error);
      setErrorMsg("Create Failed");
      toast.error('Note creation failed!');
    },
  });

  const canSave = [title, text, userId].every(Boolean) && !mutation.isLoading;

  const options = users.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.username}
      </option>
    );
  });

  const errClass = mutation.isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, text, user: userId };

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
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewNoteForm;
