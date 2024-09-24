import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../app/api/UsersFn';
import NewNoteForm from './NewNoteForm';
import useTitle from '../../app/hooks/useTitle';

const NewNote = () => {
  useTitle('techNotes: New Note')
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  
  const users = data?.users || [];

  const content = users ? <NewNoteForm users={users} /> : <h1>No users found</h1>;

  return content
}

export default NewNote