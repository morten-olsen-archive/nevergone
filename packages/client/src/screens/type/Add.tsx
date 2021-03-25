import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddType from 'containers/type/Add';

const AddTypeScreen = () => {
  const navigator = useNavigation();
  const onDone = useCallback(() => navigator.navigate('Main'), [navigator]);
  return (
    <AddType onDone={onDone} />
  );
};

export default AddTypeScreen;
