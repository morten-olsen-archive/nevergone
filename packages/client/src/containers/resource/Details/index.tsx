import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useQuery, useMutation, gql } from '@apollo/client';
import ResourceSelector from '../Selector';
import ListItem from 'compositions/resource/ListItem';
import TypeListItem from 'compositions/type/ListItem';
import Modal from 'containers/Modal';
import Row from 'components/Row';
import Button from 'components/Button';
import ResourceSelectorModal from '../SelectorModal';

interface Props {
  id: string;
  goToResource: (id: string) => void;
}

const RESOURCE = gql`
query GetResource($id: String!) {
  resource(id: $id) {
    id
    name
    type {
      name
      icon
    }
    assignedToId
    assignedTo {
      id
      name
      type {
        name
        icon
      }
    }
    assignments {
      id
      name
      type {
        name
        icon
      }
    }
  }
}
`;

const RESOURCE_DELETE = gql`
mutation DeleteResource($id: String!) {
  deleteResource(resourceId: $id)
}
`;
const RESOURCE_ASSIGN = gql`
mutation AssignResource($id: String!, $assignTo: String) {
  assignResource(resourceId: $id, assignTo: $assignTo) {
    id
  }
}
`;


const ResourceContainer: React.FC<Props> = ({ id, goToResource }) => {
  const [addOpen, setAddOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(RESOURCE, {
    variables: {
      id,
    },
    pollInterval: 10000,
  });

  const [remove] = useMutation(RESOURCE_DELETE, {
    variables: { id },
  });

  const onChange = useCallback(() => {
    refetch();
  }, [refetch]);

  const [assign] = useMutation(RESOURCE_ASSIGN, {
    onCompleted: onChange,
  });

  console.log(data);

  if (!data) {
    return <Text>Loading</Text>
  }

  return (
    <Modal
      title={data.resource.name}
      actions={[{
        icon: 'trash',
        name: 'Delete',
        onPress: () => remove(),
      }]}
    >
      <View>
        <Row title="Type">
          <TypeListItem item={data.resource.type} />
        </Row>
        <ResourceSelector
          title="Assigned to"
          value={data.resource.assignedTo} 
          goToResource={goToResource}
          onValueChange={(value) => assign({ variables: { id, assignTo: value } })}
        />
        <Row title="Items">
          {data.resource.assignments?.map((assignment: any) => (
            <ListItem
              key={assignment.id}
              item={assignment}
              onPress={() => goToResource(assignment.id)}
            />
          ))}
        </Row>
        <Row>
          <Button title="Add" onPress={() => setAddOpen(true)} />
        </Row>
        <ResourceSelectorModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSelect={(resource) => assign({ variables: { id: resource.id, assignTo: id } })}
        />
      </View>
    </Modal>
  );
}


export default ResourceContainer;
