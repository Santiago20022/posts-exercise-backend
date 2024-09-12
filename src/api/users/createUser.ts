import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";


export async function createUser(req: Request, res: Response) {
  try {
    const userRepository = AppDataSource.manager.getRepository(User);
    const {
      username,
      name,
      email,
      street,
      city,
      zipcode,
    } = req.body;
    if (!username || !name  || !email || !street || !city || !zipcode){
      return res.status(400).send({message: 'Missing required fields'})
    }
    const existingUserByEmail = await userRepository.findOneBy({ username });
    if (existingUserByEmail) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const user = new User();
    user.username = username;
    user.name = name;
    user.email = email;
    user.street = street;
    user.city = city;
    user.zipcode = zipcode;

    const savedUser = await userRepository.save(user);
    return res.send(savedUser).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
}
