import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Types from 'containers/type/List';

const TypesScreen: React.FC = () => {
  const navigator = useNavigation();
  const onAdd = useCallback(() => navigator.navigate('AddType'), [navigator]);
  const goToType = useCallback((id: string) => navigator.navigate('Type', { id }), [navigator]);
  return (
    <Types onAdd={onAdd} goToType={goToType} />
  );
};

export default TypesScreen
