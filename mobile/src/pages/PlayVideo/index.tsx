import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

import { useLessons } from '../../hooks/lessons';
import { useLessonsProgress } from '../../hooks/progress';

import { Container } from './styles';

const PlayVideo: React.FC = () => {
  const { selectedLesson: lesson } = useLessons();
  const { completeLesson } = useLessonsProgress();

  const videoRef = useRef(null);

  useEffect(() => {
    if (lesson) {
      completeLesson({
        course_lesson_index: lesson.lessonIndex,
        lesson_id: lesson.id,
      });
    }
  }, [completeLesson, lesson]);

  return (
    <Container>
      <WebView
        ref={videoRef}
        allowsFullscreenVideo
        useWebKit
        // onLoad={() => console.log(videoRef)} TODO
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction
        androidHardwareAccelerationDisabled
        javaScriptEnabled
        scrollEnabled={false}
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
        source={{
          uri: `https://youtube.com/embed/${lesson?.videoId}`,
        }}
      />
    </Container>
  );
};

export default PlayVideo;
