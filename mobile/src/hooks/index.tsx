import React from 'react';

import { CoursesProvider } from './courses';

const AppProvider: React.FC = ({ children }) => {
  return <CoursesProvider>{children}</CoursesProvider>;
};

export default AppProvider;
