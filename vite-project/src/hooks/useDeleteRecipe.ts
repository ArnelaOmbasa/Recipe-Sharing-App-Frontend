import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import RecipeService from '../services/recipes';

const useDeleteRecipe = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation((recipeId: string) => RecipeService.deleteRecipe(recipeId), 
  {
    ...options,
    onSuccess: () => {
      // Invalidate the recipes cache
      queryClient.invalidateQueries('recipes');
    },
  });
};

export default useDeleteRecipe;
