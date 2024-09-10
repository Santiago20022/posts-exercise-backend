import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "./Todo";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[]; 
  
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];  
}
