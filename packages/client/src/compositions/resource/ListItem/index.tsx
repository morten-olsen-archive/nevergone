import React from 'react';
import styled from 'styled-components/native';
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
    left={<Icon name={item.type.icon} />}
    subTitle={item.type.name}
    title={item.name}
  />
);

export default ResourceListItem;
