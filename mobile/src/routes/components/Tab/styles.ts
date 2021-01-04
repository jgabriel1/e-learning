import styled, { css } from 'styled-components/native';

export const Pressable = styled.TouchableWithoutFeedback``;

export const Container = styled.View<{ focused?: boolean }>`
  background-color: #fff;
  flex: 1;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${props =>
    props.focused &&
    css`
      border-top-width: 2px;
      border-top-color: #ff6680;
      border-bottom-width: 2px;
      border-bottom-color: #fff;
    `};
`;

export const Title = styled.Text<{ focused?: boolean }>`
  font-family: ${'roboto500'};
  font-size: 15px;
  line-height: 18px;
  margin-left: 12px;

  ${props =>
    props.focused
      ? css`
          color: #ff6680;
        `
      : css`
          color: #c4c4d1;
        `};
`;
