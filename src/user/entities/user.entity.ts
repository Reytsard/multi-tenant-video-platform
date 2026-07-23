import { VideoPost } from 'src/video-post/entities/video-post.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => VideoPost, (vp) => vp.id)
  videos: VideoPost[];
}
