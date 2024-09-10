import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({name:"userId" })
  user: User
}

