import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Todo } from "../../entity/Todo";

export async function updateTodo(req: Request, res: Response) {
  try {
    const todoId = +req.params.id; //you are forcing the conversion of the string to a number with the "+"
    const updates = req.body;
    const todoRepository = AppDataSource.manager.getRepository(Todo);
    const todo = await todoRepository.findOne({ where: { id: todoId } });
    if (!todo) {
      return res.status(404).send({ message: "todo not found" });
    }
    todoRepository.merge(todo, updates);
    await todoRepository.save(todo);
    return res.send(todo).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating todo" });
  }
}
