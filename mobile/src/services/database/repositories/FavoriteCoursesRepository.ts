import { Connection, Repository } from 'typeorm';

import { FavoriteCourse } from '../entities/FavoriteCourses';

type ID = number;

export class FavoriteCoursesRepository {
  private repository: Repository<FavoriteCourse>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(FavoriteCourse);
  }

  public async existsByCourseId(course_id: ID): Promise<boolean> {
    const favorite = await this.repository.findOne({ course_id });

    return !!favorite;
  }

  public async listAll(): Promise<FavoriteCourse[]> {
    const favorites = await this.repository.find();

    return favorites;
  }

  public async create(course_id: ID): Promise<FavoriteCourse> {
    const favorite = this.repository.create({ course_id });

    await this.repository.save(favorite);

    return favorite;
  }

  public async delete(course_id: ID): Promise<void> {
    await this.repository.delete({ course_id });
  }
}
