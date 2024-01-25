import { useMutation, UseMutationOptions } from 'react-query';
import UserService from '../services/users';

const useDeleteUser = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation<void, Error, string>(
    (userId: string) => UserService.deleteUser(userId),
    options
  );
};

export default useDeleteUser;
