import React, { useState } from 'react';
import RecipeUploadForm from '../components/RecipeUploadForm';
import UserRecipeList from '../components/UserRecipeList';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import useCreateRecipe from '../hooks/useCreateRecipe';
import { useQueryClient } from 'react-query';
import { RecipeRequestDTO } from '../utils/types';
import { RootState } from '../store';
import { useSelector } from 'react-redux';


type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

const UploadRecipePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertSeverity>('success');
  const queryClient = useQueryClient();

  const currentUserUsername = useSelector((state: RootState) => state.auth.username);

  const { mutate: createRecipe } = useCreateRecipe({
    onSuccess: () => {
      setModalOpen(false);
      queryClient.invalidateQueries(['recipes']);
      setSnackbarMessage('Recipe created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      console.error('Error creating recipe:', error);
      setSnackbarMessage('Error creating recipe');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleUploadRecipe = (title: string, description: string, ingredients: string, imageURL: string) => {
    const recipeData: RecipeRequestDTO = {
      title,
      description,
      ingredients: ingredients.split(',').map((ingredient: string) => ingredient.trim()),
      imageURL,
      ownerId: currentUserUsername || '',
    };
    createRecipe(recipeData);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);

    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2}}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 5 }}>
        Add New Recipe
      </Button>
      <RecipeUploadForm open={modalOpen} onClose={handleCloseModal} onUpload={handleUploadRecipe} />
      <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>

  <UserRecipeList authorUsername={currentUserUsername ?? ''} />
</Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadRecipePage;
