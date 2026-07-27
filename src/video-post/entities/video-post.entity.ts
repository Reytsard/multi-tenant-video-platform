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
  id?: number;

  @ManyToOne((type) => User, (user) => user.id)
  ownerId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany((_) => Comment, (comment) => comment.videoId)
  comments?: Comment[];

  @Column()
  datePosted: Date;

  @Column()
  videoPath: string;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  dislikes?: number;

  @Column({ default: 0 })
  views?: number;
}
