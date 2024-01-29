import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserParams>(
    async ({ userId, userData }) => {
      const updatedUser = await UserService.updateUser(userId, userData);
      return updatedUser;
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
        
        // Invalidate the user query to refetch the updated data
        queryClient.invalidateQueries(['user', variables.userId]);
      },
    }
  );
};


export default useUpdateUser;
