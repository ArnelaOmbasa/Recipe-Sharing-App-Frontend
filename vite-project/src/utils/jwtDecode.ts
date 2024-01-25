import {jwtDecode} from 'jwt-decode'; 


interface JwtPayload {
    userType: string;
    userId: string;
    username: string; 
    iat: number;
    exp: number;
}

export const decodeToken = (token: string): JwtPayload | null => {
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
