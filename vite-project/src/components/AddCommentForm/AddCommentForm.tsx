// NewCommentForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import useCreateComment from '../../hooks/useCreateComment';
import { useQueryClient } from 'react-query';
import { ApiError } from '../../hooks/useCreateComment';

type Props = {
  recipeId: string;
  onCommentSuccess?: () => void;
};

const NewCommentForm = ({ recipeId, onCommentSuccess }: Props) => {
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();
  const createComment = useCreateComment(recipeId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createComment.mutate(
      { recipeId, comment: { text: commentText } },
      {
        onSuccess: () => {
          setCommentText('');
          // Call the provided callback, if any
          onCommentSuccess && onCommentSuccess();
          // Invalidate and refetch the current recipe data, including comments
          queryClient.invalidateQueries(['recipe', recipeId]);
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
