import { useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import UserService from '../services/users';

const useDeleteUser = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>(
    (userId: string) => UserService.deleteUser(userId),
    {
      ...options,
      onSuccess: () => {
        // Invalidate the users cache
        queryClient.invalidateQueries('users');
      },
    }
  );
};

export default useDeleteUser;
