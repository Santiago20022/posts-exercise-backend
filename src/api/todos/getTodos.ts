import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Todo } from "../../entity/Todo";

export async function getTodos(req: Request, res: Response) {
  try {
    const todoRepository = AppDataSource.manager.getRepository(Todo);
    const todos = await todoRepository.find({
      relations: {
        user: true,
      },
       loadEagerRelations: false,
    });
    if (!todos || todos.length === 0) {
      return res.status(404).send({ message: "todos not found" });
    }
    return res.send(todos).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching todos" });
  }
}
