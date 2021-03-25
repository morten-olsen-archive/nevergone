import React, { useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styledWeb from 'styled-components';
import Row, { Icon } from '../Row';
import Props from './Props';

const Background = styledWeb.div<{ open: boolean }>`
  display: ${props => props.open ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
  backdrop-filter: blur(10px);
`;

const Wrapper = styledWeb.div`
  background: #fff;
  top: 50px;
  bottom: 0px;
  left: 0;
  right: 0;
  border-radius: 30px 30px 0 0;
  position: absolute;
  drop-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;

const Modal: React.FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  const elm = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(elm);
    return () => {
      document.body.removeChild(elm);
    };
  }, [elm]);

  const view = (
    <Background open={open}>
      <Wrapper>
        <Row right={<Icon name="close" />} onPress={onClose} />
        {children}
      </Wrapper>
    </Background>
  );

  return ReactDOM.createPortal(view, elm);
}

export default Modal;
