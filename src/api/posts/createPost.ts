import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

export async function createPost(req: Request, res: Response) {
  const { title, body, userId } = req.body;

  if (!title || !body || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await AppDataSource.manager.getRepository(User).findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = AppDataSource.manager.getRepository(Post).create({ title, body, user });
    const savedPost = await AppDataSource.manager.getRepository(Post).save(newPost);
    return res.status(201).json(savedPost);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating post" });
  }
}
