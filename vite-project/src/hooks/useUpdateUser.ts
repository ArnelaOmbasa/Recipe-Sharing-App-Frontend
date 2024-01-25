import { useMutation, UseMutationOptions } from 'react-query';
import UserService from '../services/users';
import { User } from '../utils/types';

type UpdateUserParams = {
  userId: string;
  userData: User;
};
export interface ApiError {
    message: string;
}  

const useUpdateUser = (options?: UseMutationOptions<User, Error, UpdateUserParams>) => {
  return useMutation<User, Error, UpdateUserParams>(
    ({ userId, userData }) => UserService.updateUser(userId, userData),
    options
  );
};

export default useUpdateUser;
