import React, { useState } from 'react';
import UserInfo from '../components/UserInfo';
import EditUserForm from '../components/EditUserForm';
import useGetUserById from '../hooks/useGetUserById';
import useUpdateUser from '../hooks/useUpdateUser';
import { User } from '../utils/types';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { ApiError } from '../hooks/useUpdateUser';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const UserProfile = () => {


 const userId = useSelector((state: RootState) => state.auth.userId);
  
 if (!userId) {
   return <div>Please login to view this page.</div>;
 }
 


const { data: user, isLoading, isError, error } = useGetUserById(userId);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const updateMutation = useUpdateUser({
    onSuccess: () => {
      setSnackbarMessage('User updated successfully');
      setSnackbarOpen(true);
      setIsEditing(false); // Close the form on success
    },
    onError: (error: Error) => {
      setSnackbarMessage(error.message || 'Failed to update user');
      setSnackbarOpen(true);
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    updateMutation.mutate({ userId, userData: updatedUser });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);

    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    const apiError = error as ApiError; 
    return <div>Error: {apiError.message}</div>;
  }

  return (
    <div>
      {user && (
        <>
          <UserInfo user={user} onEditClick={handleEditClick} />
          {isEditing && (
            <EditUserForm
              user={user}
              onUpdate={handleUpdateUser}
              onClose={() => setIsEditing(false)}
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
          severity={updateMutation.isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;
