import { CardMedia } from '@mui/material';

type Props = {
  imageUrl: string;
  title: string;
};

const RecipeImage = ({ imageUrl, title }: Props) => (
  <CardMedia
    component="img"
    image={imageUrl}
    alt={title}
    sx={{ width: '100%', height: 'auto', maxHeight: 1000, objectFit: 'cover' }} 
  />
);


export default RecipeImage;
