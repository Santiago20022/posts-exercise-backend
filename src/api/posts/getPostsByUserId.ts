import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

export async function getPostsByUserId(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const userRepository = AppDataSource.manager.getRepository(User);
    const user = await userRepository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.posts", "post")
      .where("user.id = :userId", { userId })
      .getOne();

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

    return res.send(user).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching posts" });
  }
}
