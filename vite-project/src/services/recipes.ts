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

  const getRecipesByTitle = async (title: string): Promise<Recipe[]> => {
    return appAxios.get(`/recipes/${title}`).then(
      (response) => response.data
    );
  };

  const deleteRecipe = async (recipeId: string): Promise<void> => {
    return appAxios.delete(`/recipes/${recipeId}`).then(res => res.data);
  };

  

// pagination and search
const getRecipesPaginated = async (name: string, page: number, size: number): Promise<Recipe[]> => {
    let data: Recipe[] = [];

    try {
        return appAxios.get(`/recipe/paginate?title=${name}&page=${page}&size=${size}`).then(
            (response) => {
                data = response.data;
                console.log(data);

                return data;
            });
    } catch(error: any) {
        console.log(error.message);
    }

    return data;
}

 const RecipeService = {
    getRecipes,
    getRecipeById,
    createRecipe,
    getRecipesByAuthor,
    deleteRecipe,
    getRecipesByTitle,
    getRecipesPaginated
};

export default RecipeService;