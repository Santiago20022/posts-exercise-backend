import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function getUserById(req: Request, res: Response) {

  const userId = req.params.id;
  if (isNaN(Number(userId))) {
    return res.status(400).send({ message: "Invalid ID" });
  }
  const id = parseInt(userId);

	try {
		const userRepository = AppDataSource.manager.getRepository(User);
    const user = await userRepository.findOne({ where: { id } }); 
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
		return res.status(200).send(user);

	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Error fetching users" });
	}
}

