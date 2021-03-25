import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Resource from 'containers/resource/Details';

const ResourceScreen: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const goToResource = useCallback(
    (id: string) => (navigation as any).push('Resource', { params: { id }, screen: 'Details',  }),
      [navigation],
  );
  return (
    <Resource id={params!.id} goToResource={goToResource} />
  );
};

export default ResourceScreen;
