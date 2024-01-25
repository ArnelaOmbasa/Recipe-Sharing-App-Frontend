
import { Grid, CircularProgress } from '@mui/material';
import RecipeCard from '../../components/RecipeCard';
import useGetRecipesByAuthor from '../../hooks/useGetRecipesByAuthor';
import { Recipe } from '../../utils/types';

type UserRecipeListProps = {
  authorUsername: string;
};

const UserRecipeList = ({ authorUsername }: UserRecipeListProps) => {
  const { data: recipes, isLoading, isError, error } = useGetRecipesByAuthor(authorUsername);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!recipes || recipes.length === 0) {
    return <div>No recipes found for this author.</div>;
  }

  return (
    <Grid spacing={2} >
      {recipes.map((recipe: Recipe) => (
        <Grid item key={recipe.recipeId} xs={12} sm={6} md={6} lg={4} xl={3}>
        <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserRecipeList;



