// useCreateRecipe.ts

import { useMutation, useQueryClient, UseMutationOptions, MutationFunction } from 'react-query';
import RecipeService from '../services/recipes';
import { Recipe } from '../utils/types';
import { RecipeRequestDTO } from '../utils/types';

type CreateRecipeMutationFn = MutationFunction<Recipe, [RecipeRequestDTO]>;

const useCreateRecipe = (options?: UseMutationOptions<Recipe, Error, RecipeRequestDTO, CreateRecipeMutationFn>) => {
  const queryClient = useQueryClient();

  return useMutation<Recipe, Error, RecipeRequestDTO, CreateRecipeMutationFn>(
    (newRecipe: RecipeRequestDTO) => RecipeService.createRecipe(newRecipe),
    {
      ...options,
      onSettled: () => {
        // Invalidate the recipes cache
        queryClient.invalidateQueries('recipes');
      },
    }
  );
};

export default useCreateRecipe;
