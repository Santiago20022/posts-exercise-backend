import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

export async function getTodosByUserId(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const userRepository = AppDataSource.manager.getRepository(User);
    const userWithTodos = await userRepository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.todos", "todo")
      .where("user.id = :userId", { userId })
      .getOne();

    if (!userWithTodos) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send(userWithTodos).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching todos" });
  }
}
