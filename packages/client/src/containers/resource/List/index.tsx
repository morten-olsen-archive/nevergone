import * as React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery, gql } from '@apollo/client';
import ResourceListItem from 'compositions/resource/ListItem';
import Search from 'components/input/Search';

const RESOURCES = gql`
query {
  resources {
    id
    name
    type {
      name
      icon
    }
  }
}
`;

const ResourcesContainer: React.FC = () => {
  const navigation = useNavigation();
  const { loading, error, data, refetch } = useQuery(RESOURCES, {
    pollInterval: 10000,
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  console.log(error);
  if (!data) {
    return <Text>Loading</Text>
  }

  return (
    <View>
      <Search />
      {data.resources.map((resource: any) => (
        <ResourceListItem
          key={resource.id}
          item={resource}
          onPress={() => navigation.navigate('Resource', { params: { id: resource.id }, screen: 'Details' })}
        />
      ))}
    </View>
  );
}


export default ResourcesContainer;
