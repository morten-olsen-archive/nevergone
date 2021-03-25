import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Modal from 'components/Modal';
import ListItem from 'compositions/resource/ListItem';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (value: any | undefined) => void;
}

const RESOURCE_TYPES = gql`
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


const ResourceSelectorModalContainer: React.FC<Props> = ({ open, onClose, onSelect }) => {
  const { loading, error, data } = useQuery(RESOURCE_TYPES, {});
  const select = useCallback((resource: any) => {
    onClose();
    onSelect(resource);
  }, [onClose, onSelect]);

  if (!data) {
    return <Text>Loading</Text>
  }

  return (
      <Modal open={open} onClose={onClose}>
        {data.resources.map((resource: any) => (
          <ListItem 
            key={resource.id}
            item={resource}
            onPress={() => select(resource)}
          />
        ))}
      </Modal>
  );
}


export default ResourceSelectorModalContainer;
