import { useMutation, UseMutationOptions } from 'react-query';
import RecipeService from '../services/recipes';

const useDeleteRecipe = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation((recipeId: string) => RecipeService.deleteRecipe(recipeId), options);
};

export default useDeleteRecipe;
