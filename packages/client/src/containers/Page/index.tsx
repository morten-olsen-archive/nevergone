import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Row, { Icon } from 'components/Row';

interface Props {
  topActions?: {
    icon: string;
    name: string;
    onPress: () => void;
  }[]
  title?: string;
  children: ReactNode;
}

const Wrapper = styled.View`
  flex: 1;
  background: #fff;
`;

const Page: React.FC<Props> = ({
  children,
  title,
  topActions,
}) => {
  const navigation = useNavigation();

  return (
    <Wrapper>
      <Row
        title={title}
        left={<Icon name="chevron-back" onPress={() => navigation.goBack()}/>}
        
        right={
          <>
            {(topActions || []).map((action) => (
              <Icon
                key={action.name}
                name={action.icon}
                onPress={action.onPress}
              />
            ))}
          </>
        }
      />
      {children}
    </Wrapper>
  );
};

export default Page;
