import React from 'react';
import styled from 'styled-components/native';
import FAIcon from 'react-native-vector-icons/Ionicons';
import Cell from './Cell';

interface Props {
  name: string;
  onPress?: () => void;
  background?: string;
}

const Touch = styled.TouchableOpacity``;

const Icon: React.FC<Props> = ({ name, onPress, background }) => {
  const view = (
    <Cell style={{ backgroundColor: background, borderRadius: 32 }}>
      <FAIcon style={{ width: 32, height: 32, padding: 2 }} name={name} size={28} />
    </Cell>
  );

  if (onPress) {
    return (
      <Touch onPress={onPress}>
        {view}
      </Touch>
    );
  }
  return view;
};

export default Icon;
