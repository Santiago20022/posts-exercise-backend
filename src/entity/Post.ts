import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name:"userId" })
  user: User   
  
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
