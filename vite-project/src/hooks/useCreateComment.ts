
import { useMutation, useQueryClient } from 'react-query';
import CommentService from '../services/comments';
import { CommentRequestDTO } from '../utils/types';

// because ts couldn't infer the type of the error
export interface ApiError {
    message: string;
}  
const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentData: { recipeId: string; comment: CommentRequestDTO }) =>
      CommentService.createComment(commentData.recipeId, commentData.comment),
      {
        onSuccess: () => {
          // Invalidate the comments cache
          queryClient.invalidateQueries('comments');
        },
      }
  );
};

export default useCreateComment;
