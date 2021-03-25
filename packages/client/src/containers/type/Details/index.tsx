import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useQuery, useMutation, gql } from '@apollo/client';
import Modal from 'containers/Modal';

interface Props {
  id: string;
  onClose: () => void;
}

const TYPE = gql`
query GetType($id: String!) {
  type(typeId: $id) {
    id
    name
    icon
  }
}
`;

const TYPE_DELETE = gql`
mutation DeleteTYPE($id: String!) {
  deleteType(typeId: $id)
}
`;

const ResourceContainer: React.FC<Props> = ({ id, onClose }) => {
  const { loading, error, data, refetch } = useQuery(TYPE, {
    variables: {
      id,
    },
    pollInterval: 10000,
  });

  const [remove] = useMutation(TYPE_DELETE, {
    variables: { id },
    onCompleted: onClose,
  });

  if (!data) {
    return <Text>Loading</Text>
  }

  return (
    <Modal
      title={data.type.name}
      actions={[{
        icon: 'trash',
        name: 'Delete',
        onPress: () => remove(),
      }]}
    >
      <View>
      </View>
    </Modal>
  );
}


export default ResourceContainer;
