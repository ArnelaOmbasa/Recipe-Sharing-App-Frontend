import appAxios from "./appAxios";
import { Recipe, RecipeRequestDTO } from "../utils/types";


const getRecipes = async (): Promise<Recipe[]> => {
    return appAxios.get(`/recipes`).then(
        (response) => {
            const data = response.data;
            console.log(data);
 
            return data;
        });
 }


 const getRecipeById = async (id: string): Promise<Recipe> => {
    return appAxios.get(`/recipes/${id}`).then(
        (response) => {
            const data = response.data;
            console.log(data);
 
            return data;
        });
}

const createRecipe = async (recipeData: RecipeRequestDTO): Promise<Recipe> => {
  return appAxios.post(`/recipes`, recipeData).then(
    (response) => {
      const data = response.data;
      return data;
    });
};


  const getRecipesByAuthor = async (username: string): Promise<Recipe[]> => {
    return appAxios.get(`/recipes/author/${username}`).then(
      (response) => response.data
    );
  };

  const deleteRecipe = async (recipeId: string): Promise<void> => {
    return appAxios.delete(`/recipes/${recipeId}`).then(res => res.data);
  };

 const RecipeService = {
    getRecipes,
    getRecipeById,
    createRecipe,
    getRecipesByAuthor,
    deleteRecipe
};

export default RecipeService;