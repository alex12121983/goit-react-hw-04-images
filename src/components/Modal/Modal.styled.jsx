import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalWindow = styled.div`
  position: relative;
  max-width: 50vw;
  max-height: 50vh;
`;

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 24px;
`;