
import { useQuery } from 'react-query';
import UserService from '../services/users';

export interface ApiError {
    message: string;
}  
const useGetUserById = (userId: string) => {
  return useQuery(['user', userId], () => UserService.getUserById(userId), {
  });
};

export default useGetUserById;
