import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Todo } from "../../entity/Todo";
import { User } from "../../entity/User";


export async function createTodo(req: Request, res: Response) {
  try {
    const todoRepository = AppDataSource.manager.getRepository(Todo);
    const {
      content,
      completed,
      userId,
    } = req.body;
    if (!content || !completed || !userId){
      return res.status(400).send({message: 'Missing required fields'})
    }
    const user = await AppDataSource.manager.getRepository(User).findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = new Todo();
    todo.content = content;
    todo.completed = completed;
    todo.user = user;

    const savedUser = await todoRepository.save(todo);
    return res.send(savedUser).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating todo" });
  }
}
