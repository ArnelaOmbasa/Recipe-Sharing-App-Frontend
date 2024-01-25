import { useQuery } from "react-query";
import { Recipe } from "../utils/types";
import RecipeService from "../services/recipes";

interface ApiError {
    message: string;
}  

const useGetRecipeById = (id: string) => {
    return useQuery<Recipe, ApiError>(['recipe', id],
        () => RecipeService.getRecipeById(id),
        { refetchOnWindowFocus: false }
    );
}

export default useGetRecipeById;
