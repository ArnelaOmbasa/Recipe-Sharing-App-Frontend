
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type RecipeUploadFormProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (title: string, description: string, ingredients: string, imageURL: string) => void;
};

const RecipeUploadForm = ({ open, onClose, onUpload }: RecipeUploadFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = () => {
    
    onUpload(title, description, ingredients, imageURL);
    onClose(); 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Upload a New Recipe
        </Typography>
        <TextField fullWidth margin="normal" label="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField fullWidth margin="normal" label="Description" multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} />
        <TextField fullWidth margin="normal" label="Ingredients (comma separated)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <TextField fullWidth margin="normal" label="Image URL" value={imageURL} onChange={e => setImageURL(e.target.value)} />
        <Button sx={{ marginTop: 2 }} variant="contained" color="primary" onClick={handleSubmit}>
          Upload Recipe
        </Button>
      </Box>
    </Modal>
  );
};

export default RecipeUploadForm;
