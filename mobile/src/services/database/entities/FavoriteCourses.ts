import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorite_courses')
export class FavoriteCourse {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  course_id: number;

  @CreateDateColumn()
  created_at: Date;
}
