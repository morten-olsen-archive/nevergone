import React, { useState, useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ListItem from 'compositions/type/ListItem';

interface Props {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

const RESOURCE_TYPES = gql`
query {
  types {
    id
    name
    icon
  }
}
`;


const ResourceTypesContainer: React.FC<Props> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(RESOURCE_TYPES, {
    pollInterval: 10000,
  });
  const select = useCallback((id: string) => {
    setOpen(false);
    onValueChange(id);
  }, [onValueChange]);
  const selected = useMemo(
    () => data?.types.find((resource: any) => resource.id === value),
    [value],
  );

  if (!data) {
    return <Text>Loading</Text>
  }

  return (
    <>
      {selected && <ListItem item={selected} onPress={() => setOpen(true)} />}
      {!selected && <Button title="Select type" onPress={() => setOpen(true)} />}
      <Modal open={open} onClose={() => setOpen(false)}>
        {data.types.map((resource: any) => (
          <ListItem 
            key={resource.id}
            item={resource}
            onPress={() => select(resource.id)}
          />
        ))}
      </Modal>
    </>
  );
}


export default ResourceTypesContainer;
