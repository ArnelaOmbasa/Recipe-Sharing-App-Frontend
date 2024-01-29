import { useMutation, useQueryClient } from 'react-query';
import CommentService from '../services/comments';
import { CommentRequestDTO } from '../utils/types';

export interface ApiError {
  message: string;
}

const useCreateComment = (recipeId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (commentData: { recipeId: string; comment: CommentRequestDTO }) =>
      CommentService.createComment(commentData.recipeId, commentData.comment),
    {
      onSuccess: () => {
        // Invalidate the comments cache
        queryClient.invalidateQueries(['comments', recipeId]);
      },
    }
  );

  return mutation;
};

export default useCreateComment;
