import appAxios from "./appAxios";
import { User } from "../utils/types";


const getUsers = async (): Promise<User[]> => {
    return appAxios.get(`/users`).then(
        (response) => {
            const data = response.data;
            console.log(data);
 
            return data;
        });
 }

 const getUserById = async (userId: string): Promise<User> => {
    return appAxios.get(`/users/${userId}`).then((response) => response.data);
};

const updateUser = async (userId: string, userData: User): Promise<User> => {
    return appAxios.put(`/users/${userId}`, userData).then(res => res.data);
  };
  
  const deleteUser = async (userId: string): Promise<void> => {
    await appAxios.delete(`/users/${userId}`);
};
  
 const UserService = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default UserService;