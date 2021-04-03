import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Row, { Icon } from 'components/Row';
import { Platform, StatusBar } from "react-native";

interface Props {
  actions?: {
    icon: string;
    name: string;
    onPress: () => void;
  }[]
  title?: string;
  children: ReactNode;
}

const Background = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  border-radius: 30px;
  bottom: -30px;
  shadow-color: rgba(0, 0, 0, 1);
  shadow-opacity: 0.30;
  shadow-radius: 16px;
  elevation: 25
  padding-top: 10px;
  padding-bottom: 30px;
  flex: 1;
  background: #fff;
  marginTop: ${Platform.OS === 'android' ? StatusBar.currentHeight : 10 }px;
`;

const Content = styled.View`
  flex: 1;
`;

const Page: React.FC<Props> = ({
  children,
  title,
  actions,
}) => {
  const navigation = useNavigation();

  return (
    <Background>
      <Wrapper>
        <Row
          title={title}
          left={<Icon name="chevron-back" onPress={() => navigation.goBack()}/>}
          right={<Icon name="close" onPress={() => navigation.navigate('Main')}/>}
          
        />
        <Content>
          {children}
        </Content>
        <Row 
          right={
            <>
              {(actions || []).map((action) => (
                <Icon
                  key={action.name}
                  name={action.icon}
                  onPress={action.onPress}
                />
              ))}
            </>
          }
        />
      </Wrapper>
    </Background>
  );
};

export default Page;
