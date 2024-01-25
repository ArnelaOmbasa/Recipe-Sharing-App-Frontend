import { useMutation } from 'react-query';
import RecipeService from '../services/recipes';
import { RecipeRequestDTO } from '../utils/types';
import { UseMutationOptions } from 'react-query';
import { Recipe } from '../utils/types';

const useCreateRecipe = (options?: UseMutationOptions<Recipe, Error, RecipeRequestDTO>) => {
    return useMutation(
      (newRecipe: RecipeRequestDTO) => RecipeService.createRecipe(newRecipe),
      options
    );
  };

export default useCreateRecipe;
