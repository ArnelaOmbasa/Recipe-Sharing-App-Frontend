import { useQuery } from "react-query";
import { User} from "../utils/types";
import UserService from "../services/users";


interface ApiError {
    message: string;
}  

const useGetAllUsers = () => {
   return useQuery<User[], ApiError>('users',
       () => UserService.getUsers(),
       { refetchOnWindowFocus: false }
   );
}


export default useGetAllUsers;