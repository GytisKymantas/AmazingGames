import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return <Spinner />;
};

export default Loader;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 2px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 0.6s linear infinite;
`;
