import { User } from '../../utils/types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserAvatar from '../UserAvatar';
import { grey } from '@mui/material/colors';

type Props = {
  user: User;
  onEditClick: () => void;
};

const UserInfo = ({ user,onEditClick }: Props) => {
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', color: '#1976D2' }}>
      <UserAvatar username={user.username} size="80px" fontSize="30px" sx={{ margin: '15px auto', bgcolor: grey[500] }} />
      <Typography variant="h5" gutterBottom sx={{ color: '#1976D2' }}>
        {user.username}
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ color: '#1976D2' }}> 
        {user.email} 
      </Typography>
      <Button 
  size="medium" 
  variant="outlined" 
  sx={{ 
    marginTop: '20px', 
    borderColor: '#1976D2', 
    color: '#1976D2', 
    '&:hover': {
      backgroundColor: '#1976D2', 
      color: 'white', 
    }
  }} onClick={onEditClick}
>
  Edit personal information
</Button>

    </Container>
  );
};

export default UserInfo;