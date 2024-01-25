import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

type Props = {
  ingredients: string[];
};

const IngredientsList = ({ ingredients }: Props) => (
  <Paper elevation={1} style={{ padding: '20px', margin: '20px 0' }}>
    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
      Ingredients:
    </Typography>
    <List dense>
      {ingredients.map((ingredient, index) => (
        <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
          <ListItemText primary={ingredient} />
        </ListItem>
      ))}
    </
List>
</Paper>
);

export default IngredientsList;