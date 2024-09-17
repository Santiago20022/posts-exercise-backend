import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

export async function postByUser(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const postRepository = AppDataSource.manager.getRepository(Post);
    const posts = await postRepository
      .createQueryBuilder("post")
      .innerJoinAndSelect("post.user", "user")
      .where("user.id = :userId", { userId })
      .getMany();

    if (!posts || posts.length === 0) {
      return res.status(404).send({ message: "Posts not found" });
    }

    return res.send(posts).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching posts" });
  }
}
