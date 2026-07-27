import { User } from 'src/user/entities/user.entity';
import { VideoPost } from 'src/video-post/entities/video-post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  comment: string;

  @ManyToOne((_) => User, (user) => user.id)
  ownerId: User;

  @ManyToOne((_) => VideoPost, (video) => video.comments)
  videoId: VideoPost;
}
