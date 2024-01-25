import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginPage = () => {
  return (
    <CenteredContainer>
      <LoginForm />
    </CenteredContainer>
  );
};

export default LoginPage;
