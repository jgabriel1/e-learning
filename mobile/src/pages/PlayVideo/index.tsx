import React, { useRef } from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

import { useLessons } from '../../hooks/lessons';

import { Container } from './styles';

const PlayVideo: React.FC = () => {
  const { selectedLesson: lesson } = useLessons();
  const videoRef = useRef(null);

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
