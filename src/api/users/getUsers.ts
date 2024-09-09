import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function getUsers(req: Request, res: Response) {
    try {
        const userRepository = AppDataSource.manager.getRepository(User);
        const users = await userRepository.find();
        if (!users || users.length === 0) {
            return  res.status(404).send({ message: "Users not found" }); 
            }
        return res.send(users).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching users" });
    }
}
