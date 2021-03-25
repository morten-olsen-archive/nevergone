import * as React from 'react';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, gql } from '@apollo/client';
import ListItem from 'compositions/type/ListItem';
import Page from 'containers/Page';

const RESOURCE_TYPES = gql`
query {
  types {
    id
    name
    icon
  }
}
`;

interface Props {
  onAdd: () => void;
  goToType: (id: string) => void;
}

const ResourceTypesContainer: React.FC<Props> = ({
  onAdd,
  goToType,
}) => {
  const { loading, error, data, refetch } = useQuery(RESOURCE_TYPES, {
    pollInterval: 10000,
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (!data) {
    return <Text>Loading</Text>
  }

  return (
    <Page
      topActions={[{
        icon: 'add-circle-outline',
        name: 'Add',
        onPress: onAdd,

      }]}
    >
      {data.types.map((resource: any) => (
        <ListItem
          key={resource.id}
          item={resource}
          onPress={() => goToType(resource.id)}
        />
      ))}
    </Page>
  );
}


export default ResourceTypesContainer;
