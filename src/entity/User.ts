import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

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

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
