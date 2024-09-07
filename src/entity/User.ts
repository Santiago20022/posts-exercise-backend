import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "./Todo";

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
 
}
