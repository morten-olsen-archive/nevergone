import React from 'react';
import styled from 'styled-components/native';

interface Props {
  title?: string;
  icon?: string;
  type?: string;
  onPress?: () => void;
}

const Touch = styled.TouchableOpacity`
`;

const Wrapper = styled.View`
  align-items: center;
`;

const Title = styled.Text``;

const Button: React.FC<Props> = ({
  title,
  onPress,
}) => {
  return (
    <Touch onPress={onPress}>
      <Wrapper>
        {title && <Title>{title}</Title>}
      </Wrapper>
    </Touch>
  );
};

export default Button;
