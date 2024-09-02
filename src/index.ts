import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    app.get('/', (req,res) =>{
        res.send('Hello, TypeScript + node.js + Express!');
    });
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
