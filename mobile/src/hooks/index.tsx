import React from 'react';

import { CoursesProvider } from './courses';
import { LessonsProvider } from './lessons';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CoursesProvider>
      <LessonsProvider>{children}</LessonsProvider>
    </CoursesProvider>
  );
};

export default AppProvider;
