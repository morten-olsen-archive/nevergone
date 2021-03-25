import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Resources from 'containers/resource/List';
import Page from 'containers/Page';

const ResourcesScreen: React.FC = () => {
  const navigator = useNavigation();
  return (
    <Page
      title="Resources"
      topActions={[{
        icon: 'add-circle-outline',
        name: 'Add',
        onPress: () => navigator.navigate('AddResource'),
      }]}
    >
      <Resources />
    </Page>
  );
};

export default ResourcesScreen
