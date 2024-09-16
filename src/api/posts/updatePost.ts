import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

export async function updatePost(req: Request, res: Response) {
  try {
    const postId = +req.params.id;
    const updates = req.body;
    
    const postRepository = AppDataSource.manager.getRepository(Post);

    const post = await postRepository.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (updates.userId) {
      const userRepository = AppDataSource.manager.getRepository(User);
      const user = await userRepository.findOne({where: { id: updates.userId }});
      if (user) {
        post.user = user;
      } 
    }

    postRepository.merge(post, updates);
    await postRepository.save(post);
    return res.status(200).json(post);

  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Error updating post" });
  }
}
