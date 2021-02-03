import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 60px 24px 24px;
`;

export const ToggleButtonPressable = styled(BorderlessButton)`
  padding: 4px;
  margin: -4px;
`;

export const SearchInputContainer = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  height: 56px;
  padding: 0 24px;
  margin: 0 20px 32px;
`;

export const SearchInput = styled.TextInput`
  font-family: ${'roboto400'};
  color: #3d3d4c;
  margin-left: 16px;
  font-size: 15px;
  line-height: 18px;
`;
