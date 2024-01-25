import appAxios from "./appAxios";
import { Comment, CommentRequestDTO } from "../utils/types";


const getComments = async (): Promise<Comment[]> => {
    return appAxios.get(`/comments`).then(
        (response) => {
            const data = response.data;
            console.log(data);
 
            return data;
        });
 }
 const createComment = async (recipeId: string, commentData: CommentRequestDTO): Promise<Comment> => {
    return appAxios.post(`/comments/${recipeId}/comment`, commentData).then(
      (response) => response.data
    ).catch((error) => {
      console.error("Axios request failed:", error.response);
    });}
    

    const deleteComment = async (recipeId: string, commentText: string): Promise<void> => {
      return appAxios.delete(`/comments/${recipeId}/${commentText}`).then(res => res.data);
    };

 const CommentService = {
    getComments,
    createComment,
    deleteComment
};

export default CommentService;