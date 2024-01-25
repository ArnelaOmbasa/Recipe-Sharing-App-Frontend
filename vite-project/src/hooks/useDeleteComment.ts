import { useMutation, UseMutationOptions } from 'react-query';
import CommentService from '../services/comments';

interface DeleteCommentParams {
  recipeId: string;
  commentText: string;
}

const useDeleteComment = (options?: UseMutationOptions<void, Error, DeleteCommentParams>) => {
  return useMutation(
    ({ recipeId, commentText }) => CommentService.deleteComment(recipeId, commentText),
    options
  );
};

export default useDeleteComment;
