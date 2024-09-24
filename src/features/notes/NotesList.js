import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../app/api/NotesFn";
import Note from "./Note";
import useAuthHooks from "../../app/hooks/useAuth";
import useAxiosPrivate from "../../app/hooks/useAxiosPrivate";
import useTitle from "../../app/hooks/useTitle";

const NotesList = () => {
  useTitle('techNotes: Notes List')
  const axiosPrivate = useAxiosPrivate();
  const { username, isManager, isAdmin } = useAuthHooks();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(axiosPrivate),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // Check if the data has the expected structure
  const allNotes  = data?.notes || [];

  // Filter notes based on user role
  const filteredNotes = isManager || isAdmin
    ? allNotes
    : allNotes.filter(note => note.username === username);

  const tableContent = filteredNotes?.length
    ? filteredNotes.map((note) => <Note key={note._id} note={note} />)
    : null;

    if (!tableContent) {
    return <h1>No notes found</h1>;
  }

  return (
    <table className="table table--notes">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th note__status">
            Username
          </th>
          <th scope="col" className="table__th note__created">
            Created
          </th>
          <th scope="col" className="table__th note__updated">
            Updated
          </th>
          <th scope="col" className="table__th note__title">
            Title
          </th>
          <th scope="col" className="table__th note__username">
            Owner
          </th>
          <th scope="col" className="table__th note__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default NotesList;
