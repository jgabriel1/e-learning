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
        <CoursesProvider>
          <ProgressProvider>
            <LessonsProvider>{children}</LessonsProvider>
          </ProgressProvider>
        </CoursesProvider>
      </FavoritesProvider>
    </DatabaseProvider>
  );
};

export default AppProvider;
