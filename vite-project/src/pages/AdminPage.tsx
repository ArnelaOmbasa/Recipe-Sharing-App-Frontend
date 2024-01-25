import React, { useState } from 'react';
import { AlertColor, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CommentIcon from '@mui/icons-material/Comment';
import PeopleIcon from '@mui/icons-material/People';
import RecipeTable from '../components/RecipeTable';
import CommentTable from '../components/CommentTable';
import UserTable from '../components/UsersTable';
import useGetAllRecipes from '../hooks/useGetAllRecipes';
import useGetAllComments from '../hooks/useGetAllComments'; 
import useGetAllUsers from '../hooks/useGetAllUsers'; 
import useDeleteUser from '../hooks/useDeleteUser';
import { Snackbar, Alert } from '@mui/material';
import useDeleteRecipe from '../hooks/useDeleteRecipe';
import useDeleteComment from '../hooks/useDeleteComment'; 



const drawerWidth = 240;

function AdminPage() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [selectedContent, setSelectedContent] = useState('');
  const { data: recipes, isLoading, isError, error } = useGetAllRecipes();
  const { data: comments, isLoading: isLoadingComments, isError: isErrorComments, error: errorComments } = useGetAllComments(); 
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useGetAllUsers(); 
  
  const deleteMutation = useDeleteUser({
    onSuccess: () => {
      setSnackbarMessage('User deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      window.location.reload();
    },
    onError: (error) => {
      setSnackbarMessage(error.message || 'Error deleting user');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
  });

  const handleDeleteUser = (userId: string) => {
    deleteMutation.mutate(userId);
  };

  const deleteRecipeMutation = useDeleteRecipe({
    onSuccess: () => {
      setSnackbarMessage('Recipe deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
window.location.reload();    },
    onError: (error) => {
      setSnackbarMessage(error.message || 'Error deleting recipe');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
  });

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipeMutation.mutate(recipeId);
  };
  
  const deleteCommentMutation = useDeleteComment({
    onSuccess: () => {
      setSnackbarMessage('Comment deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      window.location.reload();
    },
    onError: (error) => {
      setSnackbarMessage(error.message || 'Error deleting comment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
  });


  const handleDeleteComment = (recipeId: string, commentText: string) => {
    deleteCommentMutation.mutate({ recipeId, commentText });
  };

  const handleListItemClick = (content: string) => {
    setSelectedContent(content);
  };


 
  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);

    setSnackbarOpen(false);
  };
  

  return (
    <Box sx={{ display: 'flex', pt: '64px'}}>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', top: '64px' },
      }}
    >
        <Toolbar />
        <List>
          {['Recipes', 'Comments', 'Users'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => handleListItemClick(text)}
              selected={selectedContent === text}
            >
              <ListItemIcon>
                {index === 0 ? <KitchenIcon /> : index === 1 ? <CommentIcon /> : <PeopleIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: '64px'  }}
      >
        <Toolbar />
        {selectedContent === 'Recipes' && (
          <>
            {isLoading && <Typography>Loading recipes...</Typography>}
            {isError && <Typography>Error: {error?.message}</Typography>}
            {!isLoading && !isError && recipes && (
              <RecipeTable
                recipes={recipes}
                onDelete={handleDeleteRecipe}
              />
            )}
          </>
        )}
         {selectedContent === 'Comments' && (
          <>
            {isLoadingComments && <Typography>Loading comments...</Typography>}
            {isErrorComments && <Typography>Error: {errorComments?.message}</Typography>}
            {!isLoadingComments && !isErrorComments && comments && (
              <CommentTable
                comments={comments}
                onDelete={handleDeleteComment}
              />
            )}
            
          </>
        )}

{selectedContent === 'Users' && (
          <>
            {isLoadingUsers && <Typography>Loading users...</Typography>}
            {isErrorUsers && <Typography>Error: {errorUsers?.message}</Typography>}
            {!isLoadingUsers && !isErrorUsers && users && (
              <UserTable
                users={users}
                onDelete={handleDeleteUser}
              />
            )}
          </>
        )}

<Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbarSeverity}
    sx={{ width: '100%' }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
      </Box>
    </Box>
  );
}

export default AdminPage;
