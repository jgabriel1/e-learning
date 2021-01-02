import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #6548a3;
`;

export const Header = styled.View`
  margin: 60px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const MainContent = styled.View`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #f0edf5;
  padding: 0 24px;
`;

export const VideoPlaceholder = styled.View`
  background-color: #3d3d4c;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  height: 210px;
  justify-content: center;
  align-items: center;

  margin: 0 -24px 24px;
`;

export const Title = styled.Text`
  margin-bottom: 16px;
  font-size: 30px;
  line-height: 36px;
  color: #3d3d4c;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  align-items: center;
`;

export const Index = styled.Text`
  color: #a0a0b2;
  margin-right: 16px;
  font-size: 12px;
  line-height: 14px;
`;

export const DurationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DurationText = styled.Text`
  color: #a0a0b2;
  margin-left: 8px;
  font-size: 12px;
  line-height: 14px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 15px;
  line-height: 25px;
  margin-bottom: 24px;
`;

export const BottomButtonsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const NavigateLessonButton = styled.View`
  padding: 18px 24px;
  border-radius: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PreviousLessonButton = styled(NavigateLessonButton)`
  background-color: transparent;
`;

export const NextLessonButton = styled(NavigateLessonButton)`
  background-color: #ff6680;
`;

const NavigateLessonButtonText = styled.Text`
  font-size: 15px;
`;

export const PreviousLessonButtonText = styled(NavigateLessonButtonText)`
  color: #ff6680;
  margin-left: 8px;
`;

export const NextLessonButtonText = styled(NavigateLessonButtonText)`
  color: #ffffff;
  margin-right: 8px;
`;
