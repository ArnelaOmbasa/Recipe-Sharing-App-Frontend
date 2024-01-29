import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import CommentService from '../services/comments';

interface DeleteCommentParams {
  recipeId: string;
  commentText: string;
}

const useDeleteComment = (options?: UseMutationOptions<void, Error, DeleteCommentParams>) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ recipeId, commentText }) => CommentService.deleteComment(recipeId, commentText),
    {
      ...options,
      onSuccess: () => {
        // Invalidate the comments cache
        queryClient.invalidateQueries('comments');
      },
    }
  );
};

export default useDeleteComment;
