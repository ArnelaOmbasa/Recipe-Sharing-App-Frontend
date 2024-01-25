import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Comment } from '../../utils/types'; 

interface CommentTableProps {
  comments: Comment[];
  onDelete: (recipeId: string, commentText: string) => void; 
}

function CommentTable(props: CommentTableProps) {
  const { comments, onDelete } = props;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="comment table">
        <TableHead>
          <TableRow>
            
            <TableCell>Comment Text</TableCell>
            <TableCell>Author</TableCell> 
            <TableCell>RecipeId</TableCell> 
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.commentId}>
              
              <TableCell>{comment.text}</TableCell>
              <TableCell>{comment.authorId}</TableCell> 
              <TableCell>{comment.recipeId}</TableCell> 
              <TableCell>
                <IconButton onClick={() => onDelete(comment.recipeId, comment.text)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommentTable;
