import React from 'react';
import styled from 'styled-components/native';
import Row, { Icon } from '../Row';
import Props from './Props';

const Background = styled.Modal`
`;

const Wrapper = styled.View`
  margin-top: 70px;
  border-radius: 30px;
  background: #fff;
  padding-top: 10px;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-opacity: 0.30;
  shadow-radius: 16px;
  elevation: 25
  padding-bottom: 30px;
  margin-bottom: -30px;
`;
const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Background
      visible={open}
      animationType="slide"
      transparent={true}
    >
      <Wrapper>
        <Row right={<Icon name="close" />} onPress={onClose} />
        {children}
      </Wrapper>
    </Background>
  );
};

export default Modal;
