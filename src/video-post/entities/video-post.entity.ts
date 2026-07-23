import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VideoPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id)
  ownerId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @OneToMany((type) => Comment, (comment) => comment.id)
  comments: Comment[];
}
