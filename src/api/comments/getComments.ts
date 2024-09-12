import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entity/Comment";

export async function getComments (req: Request, res: Response) {
	try {
		const commentRepository = AppDataSource.manager.getRepository(Comment);
		const comments = await commentRepository.find({
      relations: {
        user: true,
        post: true,
      },
      loadEagerRelations: false,
    });
		if (!comments || comments.length === 0) {
			return  res.status(404).send({ message: "Comments not found" }); 
		}
		return res.send(comments).status(200);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Error fetching comments" });
	}
}
