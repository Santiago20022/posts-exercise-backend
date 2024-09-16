import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entity/Comment";
import { User } from "../../entity/User";
import { Post } from "../../entity/Post";

export async function updateComment(req: Request, res: Response) {
  try {
    const commentId = +req.params.id;
    const updates = req.body;

    const commentRepository = AppDataSource.manager.getRepository(Comment);
    const comment = await commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (updates.userId) {
      const userRepository = AppDataSource.manager.getRepository(User);
      const user = await userRepository.findOne({ where: { id: updates.userId } });
      if (user) {
        comment.user = user;
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }

    if (updates.postId) {
      const postRepository = AppDataSource.manager.getRepository(Post);
      const post = await postRepository.findOne({ where: { id: updates.postId } });
      if (post) {
        comment.post = post;
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    }

    commentRepository.merge(comment, updates);
    await commentRepository.save(comment);

    return res.status(200).json(comment);

  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ message: "Error updating comment" });
  }
}
