import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { Comment } from '../../entity/Comment';
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export async function getCommentsByPostId(req: Request, res: Response) {
  const { postId } = req.params;

  try {
  const postIdNumber = Number(postId);
  if (isNaN(postIdNumber)) {return res.status(400).json({ message: "Invalid post ID" })};

  const comments = await AppDataSource.getRepository(Comment)
    .createQueryBuilder("comment")
    .select([
      "comment.id AS commentId",
      "comment.body AS commentBody",
      "post.title AS postTitle",
      "user.username AS username"
    ])
    .innerJoin(Post, "post", "comment.postId = post.id")
    .innerJoin(User, "user", "comment.userId = user.id")
    .where("post.id = :postId", { postId: postIdNumber })
    .getRawMany();

  if (comments.length === 0) {
    return res.status(404).json({ message: "No comments found for this post" });
  }

  return res.status(200).json(comments);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving comments" });
  }
}
