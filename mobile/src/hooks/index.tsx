import React from 'react';

import { CoursesProvider } from './courses';
import { DatabaseProvider } from './database';
import { LessonsProvider } from './lessons';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DatabaseProvider>
      <CoursesProvider>
        <LessonsProvider>{children}</LessonsProvider>
      </CoursesProvider>
    </DatabaseProvider>
  );
};

export default AppProvider;
