import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = +req.params.id; //you are forcing the conversion of the string to a number with the "+"
    const updates = req.body;
    const userRepository = AppDataSource.manager.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    userRepository.merge(user, updates);
    await userRepository.save(user);
    return res.send(user).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user" });
  }
}
