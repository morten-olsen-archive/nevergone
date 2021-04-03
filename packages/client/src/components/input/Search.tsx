import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = styled.TextInput`
  flex: 1;
  margin-left: 15px;
`;

const Wrapper = styled.View`
  background: #eee;
  margin: 0px 20px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
`;

const Search = () => (
  <Wrapper>
    <Icon name="search-outline" size={18} />
    <Input placeholder="Search" />
  </Wrapper>
);

export default Search;
