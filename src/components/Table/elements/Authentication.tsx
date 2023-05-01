import React, { useState } from 'react';
import styled from 'styled-components';

const Authentication: React.FC = () => {
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accountName === 'admin' && password === 'happy123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('accountName', accountName);
      window.location.reload();
    } else {
      alert('Invalid account name or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accountName');
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Container>
      {isLoggedIn ? (
        <div>
          <p>Permission authorized</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <FormContainer>
          <p>
            To gain access to the control dashboard, please enter your
            credentials
          </p>
          <form onSubmit={handleLogin}>
            <label>
              Account name:
              <input
                type='text'
                placeholder='Account name'
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br />
            <button type='submit'>Log in</button>
          </form>
        </FormContainer>
      )}
    </Container>
  );
};

export default Authentication;

const Container = styled.div`
  display: flex;
  justify-content: Center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
