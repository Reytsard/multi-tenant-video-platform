import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
@Entity()
export class Comment {
  @PrimaryColumn()
  id: number;

  @Column()
  comment: string;

  @OneToOne((type) => User, (user) => user.id)
  ownerId: User;
}
