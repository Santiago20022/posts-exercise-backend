import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({name:
  "userId" })
  user: User   
  comments: any;
}
