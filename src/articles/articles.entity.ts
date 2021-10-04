import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  link: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.id, { eager: false })
  user: User;
}
