import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm';
import { fetchUsers } from '../../app/api/UsersFn';
import { fetchNote } from '../../app/api/NotesFn';
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate';
import useTitle from '../../app/hooks/useTitle';

const EditNote = () => {
  useTitle('techNotes: Edit Note')
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams()

  const { data, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(axiosPrivate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

    // Fetch note
    const { data: note, isLoading } = useQuery({
      queryKey: ["notes", id],
      queryFn: () => fetchNote(axiosPrivate, id),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    });

  if (isLoading || userLoading) {
    return <h1>Loading...</h1>;
  }

  const users = data?.users || [];

  const content = users && note ? <EditNoteForm users={users} note={note} /> : <p>No Data</p> ;

  return content

}

export default EditNote