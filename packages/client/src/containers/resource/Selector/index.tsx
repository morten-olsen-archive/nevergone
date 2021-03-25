import React, { useState, useCallback } from 'react';
import EditRow from 'components/EditRow';
import ResourceSelectorModal from '../SelectorModal';
import ListItem from 'compositions/resource/ListItem';

interface Props {
  title?: string;
  value: any | undefined;
  goToResource: (id: string) => void;
  onValueChange: (value: any | undefined) => void;
}

const ResourceSelectorContainer: React.FC<Props> = ({ title, value, onValueChange, goToResource }) => {
  const [open, setOpen] = useState(false);
  const select = useCallback((resource: any| undefined) => {
    setOpen(false);
    onValueChange(resource.id);
  }, [onValueChange]);

  return (
    <>
      <EditRow title={title} onEdit={() => setOpen(true)}>
        {!value && (
          <div>None</div>
        )}
        {value && (
          <ListItem 
            key={value.id}
            item={value}
            onPress={() => goToResource(value.id)}
          />
        )}
      </EditRow>
      <ResourceSelectorModal
        onClose={() => setOpen(false)}
        onSelect={select}
        open={open}
      />
    </>
  );
}


export default ResourceSelectorContainer;
