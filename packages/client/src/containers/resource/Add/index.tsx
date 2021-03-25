import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import TypeSelector from 'containers/type/Selector';
import Modal from 'containers/Modal';

interface Props {
  onClose: () => void;
}
const ADD_RESOURCES = gql`
mutation($type: String!, $name: String!) {
  addResources(
    resource: {
      typeId: $type
      name: $name
    }
  ) {
    id
  }
}

`;



const AddResourceContainer: React.FC<Props> = ({
  onClose,
}) => {
  const [type, setType] = useState<string>();
  const [name, setName] = useState('');
  const [addResouces] = useMutation(ADD_RESOURCES, {
    variables: {
      type,
      name,
    },
    onCompleted: onClose,
  });

  return (
    <Modal
      actions={[{
        icon: 'add-circle-outline',
        name: 'Add',
        onPress: () => addResouces(),
      }]}
    >
      <TypeSelector value={type} onValueChange={setType} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
    </Modal>
  );
}


export default AddResourceContainer;
