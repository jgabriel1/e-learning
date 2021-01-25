import { Repository, Connection } from 'typeorm';

import { CourseProgress } from '../entities/CourseProgress';

type ID = number;

interface CreateCourseProgressDTO {
  course_id: ID;
  lesson_id: ID;
  course_lesson_index: number;
}

export class CourseProgressRepository {
  private repository: Repository<CourseProgress>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(CourseProgress);
  }

  public async findByCourseId(course_id: ID): Promise<CourseProgress[]> {
    const progresses = await this.repository.find({ course_id });

    return progresses;
  }

  public async create({
    course_id,
    lesson_id,
    course_lesson_index,
  }: CreateCourseProgressDTO): Promise<CourseProgress> {
    const progress = this.repository.create({
      course_id,
      lesson_id,
      course_lesson_index,
    });

    await this.repository.save(progress);

    return progress;
  }
}
