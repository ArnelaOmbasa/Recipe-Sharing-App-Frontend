
import Avatar from '@mui/material/Avatar';
import { SxProps } from '@mui/system';

type AvatarProps = {
    username: string;
    size?: string;
    fontSize?: string;
    sx?: SxProps;
};

const UserAvatar = ({ username, size = '34px', fontSize = '20px', sx }: AvatarProps) => {
    const generateInitials = (username: string) => {
      
        let initials = username.substring(0, 1).toUpperCase();
        return { children: initials };
    };

    const avatarProps = generateInitials(username);

    return (
        <Avatar {...avatarProps} sx={{ width: size, height: size, fontSize: fontSize, ...sx }} />
    );
};

export default UserAvatar;
