import { useQuery } from 'react-query';
import RecipeService from '../services/recipes';
import { Recipe } from '../utils/types';

const useGetRecipesByTitle = (recipeTitle: string) => {
  return useQuery<Recipe[], Error>(
    ['recipesByTitle', recipeTitle],
    () => RecipeService.getRecipesByTitle(recipeTitle),
    {
    }
  );
};

export default useGetRecipesByTitle;
