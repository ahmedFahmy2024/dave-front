import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../app/api/NotesFn";
import Note from "./Note";

const NotesList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
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
  const notes = data?.notes || [];

    // Sort the notes to put completed notes at the bottom
    const sortedNotes = notes.sort((a, b) => a.completed - b.completed);

  const tableContent = notes?.length
    ? notes.map((note) => <Note key={note._id} note={note} />)
    : null;

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
