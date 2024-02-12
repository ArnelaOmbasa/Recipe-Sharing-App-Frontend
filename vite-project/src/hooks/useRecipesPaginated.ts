import { Recipe } from "../utils/types";
import { useQuery } from 'react-query';
import RecipeService from '../services/recipes';
import { AxiosError } from 'axios';

const useRecipesPaginated = (name: string, page: number, size: number) => {
   return useQuery<Recipe[], AxiosError>(['recipes', name, page, size],
       () => RecipeService.getRecipesPaginated(name, page, size),
       { refetchOnWindowFocus: false }
   );
}

export default useRecipesPaginated;

