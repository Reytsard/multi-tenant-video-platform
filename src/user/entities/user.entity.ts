import { IsEmail } from 'class-validator';
import { VideoPost } from 'src/video-post/entities/video-post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => VideoPost, (vp) => vp.owner, { nullable: true })
  videos: VideoPost[];
}
