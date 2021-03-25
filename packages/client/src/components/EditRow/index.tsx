import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import Row, { Icon } from '../Row';

interface Props {
  children: ReactNode;
  title?: string;
  onEdit: () => void;
}

const EditRow: React.FC<Props> = ({
  title,
  onEdit,
  children,
}) => {
  return (
    <Row title={title} right={<Icon name="pencil" background="#ccc" onPress={onEdit} />}>
      {children}
    </Row>
  );
};

export default EditRow;
