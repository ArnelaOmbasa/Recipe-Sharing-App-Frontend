import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../utils/types'; 

interface UserTableProps {
  users: User[];
  onDelete: (userId: string) => void;
}

function UserTable(props: UserTableProps) {
  const { users, onDelete } = props;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell component="th" scope="row">
                {user.userId}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
              <IconButton onClick={() => onDelete(user.userId)} color="error">
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

export default UserTable;
