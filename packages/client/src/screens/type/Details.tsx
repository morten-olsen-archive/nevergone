import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import TypeDetails from 'containers/type/Details';

const TypesScreen: React.FC = () => {
  const { params } = useRoute<any>();
  const navigator = useNavigation();
  const onClose = useCallback(() => navigator.navigate('Main'), [navigator]);
  return (
    <TypeDetails id={params!.id} onClose={onClose} />
  );
};

export default TypesScreen
