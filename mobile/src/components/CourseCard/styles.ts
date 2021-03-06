import styled from 'styled-components/native';

export const Pressable = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  background-color: #fff;
  height: 172px;
  border-radius: 16px;
  margin-bottom: 18px;
  flex-grow: 1;
  flex-basis: 0;
`;

export const CourseImage = styled.ImageBackground.attrs({
  style: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
})`
  flex: 1;
`;

export const InfoContainer = styled.View.attrs({
  style: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
})`
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: ${'rubik400'};
  color: #6c6c80;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 4px;
`;

export const LessonsCount = styled.Text`
  font-family: ${'roboto400'};
  font-size: 10px;
  line-height: 12px;
  color: #c4c4d1;
`;
