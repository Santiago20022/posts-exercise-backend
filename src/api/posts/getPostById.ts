import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";

export async function getPostById(req: Request, res: Response) {
  try {
    const postId = parseInt(req.params.id); 
    const postRepository = AppDataSource.manager.getRepository(Post);
    const post = await postRepository.findOne({
      where: { id: postId },
      relations: {
        user: true,
      },
      loadEagerRelations: false,
    });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    return res.send(post).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching post" });
  }
}