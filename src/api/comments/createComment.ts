import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entity/Comment";
import { User } from "../../entity/User";
import { Post } from "../../entity/Post";

export async function createComment(req: Request, res: Response) {
  const { body, userId, postId } = req.body;

  if (!body || !userId || !postId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await AppDataSource.manager.getRepository(User).findOne({ where: {id: userId} });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await AppDataSource.manager.getRepository(Post).findOne({ where: {id: postId} });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentRepository = AppDataSource.manager.getRepository(Comment);
    const newComment = commentRepository.create({ body, user, post });
    const savedComment = await commentRepository.save(newComment);

    return res.status(201).json(savedComment);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating comment" });
  }
}
