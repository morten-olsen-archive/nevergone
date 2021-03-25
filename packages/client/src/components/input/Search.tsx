import React from 'react';
import styled from 'styled-components/native';
import Row, { Icon, Cell } from 'components/Row';

const Input = styled.TextInput`
  flex: 1;
  outline: none;
`;

const Wrapper = styled.View`
  background: #eee;
  margin: 10px 50px;
  flex-direction: row;
  align-items: left;
  border-radius: 20px;
`;

const Search = () => (
  <Wrapper>
    <Icon name="search-outline" />
    <Input placeholder="Search" />
  </Wrapper>
);

export default Search;
