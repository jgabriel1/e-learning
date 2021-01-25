import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('course_progresses')
export class CourseProgress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  course_id: number;

  @Column()
  lesson_id: number;

  @Column()
  course_lesson_index: number;

  @CreateDateColumn()
  created_at: Date;
}
