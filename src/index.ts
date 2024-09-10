import { AppDataSource } from "./data-source";
import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import router from "./api";
dotenv.config();

const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    app.get('/', (req,res) => res.sendStatus(200));
    app.use('/api', router);
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
