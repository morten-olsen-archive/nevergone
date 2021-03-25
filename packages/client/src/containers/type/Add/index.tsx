import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import Modal from 'containers/Modal';

interface Props {
  onDone: () => void;
}

const ADD_RESOURCE_TYPE = gql`
mutation($name: String!, $icon: String!) {
  addResourceType(
    resourceType: {
      name: $name
      icon: $icon
    }
  ) {
    id
  }
}

`;


const AddResourceTypeContainer: React.FC<Props> = ({
  onDone,
}) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [addResouceType] = useMutation(ADD_RESOURCE_TYPE, {
    variables: { name, icon },
  });

  return (
    <Modal
      actions={[{
        icon: 'add-circle-outline',
        name: 'Add',
        onPress: async () => {
          await addResouceType();
          onDone();
        },
      }]}
    >
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Icon" value={icon} onChangeText={setIcon} />
    </Modal>
  );
}


export default AddResourceTypeContainer;
