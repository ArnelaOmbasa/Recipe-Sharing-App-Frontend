import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Recipe } from '../../utils/types';
import { Link } from 'react-router-dom';

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
<Card sx={{ minWidth: 200, maxWidth: "sm", display: 'flex', flexDirection: 'column' }}>
  <CardMedia
    component="img"
    height="140"
    image={recipe.imageURL}
    alt={recipe.title}
  />
  <CardContent sx={{ flexGrow: 1 }}>
      
        <Typography gutterBottom variant="body1" component="div">
          {recipe.title}
        </Typography>
        <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' 
        }}>
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
      <Button size="small" component={Link} to={`/recipe/${recipe.recipeId}`}>
        View Details
      </Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
