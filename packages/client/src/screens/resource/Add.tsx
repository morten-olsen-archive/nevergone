import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AddResouce from 'containers/resource/Add';

const AddResourceScreen = () => {
  const navigator = useNavigation();
  const onClose = useCallback(() => navigator.navigate('Main'), [navigator]);
  return (
    <AddResouce onClose={onClose} />
  );
};

export default AddResourceScreen;
