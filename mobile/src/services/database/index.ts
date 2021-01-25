import { ConnectionOptions } from 'typeorm';

import { CourseProgress } from './entities/CourseProgress';
import { FavoriteCourse } from './entities/FavoriteCourses';

// TODO: maybe do a reducer thing to parse the query string instead of just exporting
// the functions and calling them directly;

export const connectionConfig: ConnectionOptions = {
  type: 'expo',
  database: 'e_learning_001.db',
  entities: [CourseProgress, FavoriteCourse],
  synchronize: true,

  driver: require('expo-sqlite'),
};
