import { Grid, Card, Box, Typography } from '@mui/material';
import RecipeImage from '../components/RecipeImage';
import IngredientsList from '../components/IngredientsList';
import CommentsList from '../components/CommentsList';
import NewCommentForm from '../components/AddCommentForm';
import { useParams } from 'react-router-dom';
import useGetRecipeById from '../hooks/useGetRecipeById'; 



const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId?: string }>(); 
  const {
    data: recipe,
    isLoading,
    isError,
    error
  } = useGetRecipeById(recipeId!); 


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }





  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              img: { width: '100%', height: 'auto' },
            }}
          >
            <RecipeImage imageUrl={recipe.imageURL} title={recipe.title} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {recipe.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {recipe.description}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, mb: 2 }}>
              <IngredientsList ingredients={recipe.ingredients} />
            </Box>
            <Box>
            <CommentsList comments={recipe.comments} />
                    </Box>
            <Box sx={{ mt: 4 }}>
              <NewCommentForm recipeId={recipeId!} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetailPage;
