// useCreateRecipe.ts

import { useMutation, useQueryClient } from 'react-query';
import RecipeService from '../services/recipes';
import { RecipeRequestDTO } from '../utils/types';
import { UseMutationOptions } from 'react-query';
import { Recipe } from '../utils/types';

const useCreateRecipe = (options?: UseMutationOptions<Recipe, Error, RecipeRequestDTO>) => {
  const queryClient = useQueryClient();

  return useMutation(
    (newRecipe: RecipeRequestDTO) => RecipeService.createRecipe(newRecipe),
    {
      ...options,
      onSettled: (data, error, variables, context) => {
        options?.onSettled?.(data, error, variables, context);
        // Invalidate the recipes cache
        queryClient.invalidateQueries('recipes');
      },
    }
  );
};

export default useCreateRecipe;
