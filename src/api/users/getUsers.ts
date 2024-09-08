import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function getUsers(req: Request, res: Response) {
    const userRespository = AppDataSource.manager.getRepository(User);
    const users = await userRespository.find();
    console.log(users)
    res.send(users).status(200);
}
