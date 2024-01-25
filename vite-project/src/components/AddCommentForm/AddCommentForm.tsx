import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useCreateComment from '../../hooks/useCreateComment'; 
import { useQueryClient } from 'react-query';
import { ApiError } from '../../hooks/useCreateComment';

type Props = {
  recipeId: string;
};

const NewCommentForm = ({ recipeId }: Props) => {
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient(); 
  const createComment = useCreateComment(); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createComment.mutate(
      { recipeId, comment: { text: commentText } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['comments', recipeId]); 
          setCommentText(''); 
          window.location.reload();

        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Add a comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={createComment.isLoading}>
        Post Comment
      </Button>
      {createComment.isError && (
        <div>An error occurred: {(createComment.error as ApiError).message}</div>
      )}
    </Box>
  );
};

export default NewCommentForm;
