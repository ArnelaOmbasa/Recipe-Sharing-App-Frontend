import { useQuery } from 'react-query';
import RecipeService from '../services/recipes';
import { Recipe } from '../utils/types';

const useGetRecipesByAuthor = (authorUsername: string) => {
  return useQuery<Recipe[], Error>(
    ['recipesByAuthor', authorUsername],
    () => RecipeService.getRecipesByAuthor(authorUsername),
    {
    }
  );
};

export default useGetRecipesByAuthor;
