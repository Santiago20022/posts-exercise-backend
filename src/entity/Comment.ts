import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class COmment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({name:
  "userId" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({name:
  "userId" })
  post: Post
}
