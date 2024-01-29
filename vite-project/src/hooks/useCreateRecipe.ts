// useCreateRecipe.ts

import { useMutation, useQueryClient } from 'react-query';
import RecipeService from '../services/recipes';
import { RecipeRequestDTO } from '../utils/types';
import { UseMutationOptions } from 'react-query';
import { Recipe } from '../utils/types';

const useCreateRecipe = (options?: UseMutationOptions<Recipe, Error, RecipeRequestDTO>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newRecipe: RecipeRequestDTO) => RecipeService.createRecipe(newRecipe),
    options
  );

  const createRecipe = async (newRecipe: RecipeRequestDTO) => {
    await mutation.mutateAsync(newRecipe);
    queryClient.refetchQueries('recipes');
  };

  return { ...mutation, mutate: createRecipe };
};

export default useCreateRecipe;
