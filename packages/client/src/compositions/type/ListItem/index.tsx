import React from 'react';
import Row, { Icon } from '../../../components/Row';

interface Props {
  item: any;
  onPress?: () => void;
}

const ResourceListItem: React.FC<Props> = ({
  item,
  onPress,
}) => (
  <Row
    onPress={onPress}
    left={<Icon name={item.icon} />}
    title={item.name}
  />
);

export default ResourceListItem;
