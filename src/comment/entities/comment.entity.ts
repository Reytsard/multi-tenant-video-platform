import { User } from 'src/user/entities/user.entity';
import { Column, OneToOne, PrimaryColumn } from 'typeorm';

export class Comment {
  @PrimaryColumn()
  id: number;

  @Column()
  comment: string;

  @OneToOne((type) => User, (user) => user.id)
  ownerId: User;
}
