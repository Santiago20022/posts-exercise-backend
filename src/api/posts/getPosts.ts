import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";

export async function getPosts(req: Request, res: Response) {
  try {
    const postRepository = AppDataSource.manager.getRepository(Post);
    const posts = await postRepository.find({
      relations: {
        user: true,
      },
      loadEagerRelations: false,
    });
    if (!posts || posts.length === 0) {
      return res.status(404).send({ message: "Posts not found" });
    }
    return res.send(posts).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching posts" });
  }
}
