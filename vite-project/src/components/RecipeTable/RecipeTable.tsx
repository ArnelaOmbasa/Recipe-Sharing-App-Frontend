import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Recipe } from '../../utils/types'; 

interface RecipeTableProps {
  recipes: Recipe[];
  onDelete: (recipeId: string) => void;
}

function RecipeTable(props: RecipeTableProps) {
  const { recipes, onDelete } = props;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="recipe table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Ingredients</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.recipeId}>
              <TableCell component="th" scope="row">{recipe.recipeId}</TableCell>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>{recipe.description}</TableCell>
              <TableCell>{recipe.ingredients.join(', ')}</TableCell>
              <TableCell>
                <a href={recipe.imageURL} target="_blank" rel="noopener noreferrer">View Image</a>
              </TableCell>
              <TableCell>{recipe.ownerId}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(recipe.recipeId)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecipeTable;
