import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Title, Byline, Body } from 'typography';
import Cell from './Cell';
import Icon from './Icon';

interface Props {
  left?: ReactNode;
  right?: ReactNode;
  icon?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  children?: ReactNode;
}

const Touch = styled.TouchableOpacity`
`;

const Wrapper = styled(Cell)`
  flex-direction: row;
`;

const Main = styled(Cell)`
  align-items: left;
  flex: 1;
`;

const Row: React.FC<Props> = ({
  left,
  right,
  icon,
  title,
  subTitle,
  description,
  children,
  onPress,
  onLongPress,
}) => {
  const rowItem = (
    <Wrapper>
      { left }
      <Main>
        {subTitle && <Byline>{subTitle}</Byline>}
        {title && <Title>{title}</Title>}
        {description && <Body>{description}</Body>}
        {children}
      </Main>
      { right }
    </Wrapper>
  );

  if (onPress || onLongPress) {
    return (
      <Touch onPress={onPress} onLongPress={onLongPress}>
        {rowItem}
      </Touch>
    );
  }

  return rowItem;
};

export { Icon, Cell };

export default Row;
