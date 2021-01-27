import React from 'react';

import { CoursesProvider } from './courses';
import { DatabaseProvider } from './database';
import { FavoritesProvider } from './favorites';
import { LessonsProvider } from './lessons';
import { ProgressProvider } from './progress';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DatabaseProvider>
      <FavoritesProvider>
        <ProgressProvider>
          <CoursesProvider>
            <LessonsProvider>{children}</LessonsProvider>
          </CoursesProvider>
        </ProgressProvider>
      </FavoritesProvider>
    </DatabaseProvider>
  );
};

export default AppProvider;
