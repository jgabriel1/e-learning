import styled from 'styled-components/native';

export const Pressable = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  flex-direction: row-reverse;
  margin-bottom: 16px;
  align-items: center;
  position: relative;
`;

const PlayIconContainer = styled.View`
  height: 68px;
  width: 68px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const GreenPlayIconContainer = styled(PlayIconContainer)`
  background-color: #61c5bd;
`;

export const RedPlayIconContainer = styled(PlayIconContainer)`
  background-color: #ff6680;
`;

export const MainContainer = styled.View`
  flex: 1;
  height: 100px;
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  padding-left: 56px;
  margin-left: -36px;
`;

export const TitleContainer = styled.View`
  width: 80%;
  margin-bottom: 16px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #6c6c80;
`;

export const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
`;

export const LessonNumber = styled.Text`
  margin-right: 16px;
  color: #c4c4d1;
  font-size: 12px;
`;

export const LessonDurationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LessonDurationText = styled.Text`
  font-size: 12px;
  margin-left: 5px;
  color: #c4c4d1;
`;

export const CompletedContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #61c5bd;
  border-radius: 12px;
  padding: 3px 8px;
`;

export const CompletedText = styled.Text`
  font-size: 12px;
  color: #fff;
`;
