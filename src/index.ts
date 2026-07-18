import express, { Request, Response, Express } from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.routes.js";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

config();

app.use(express.json());

app.use(express.urlencoded());

app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log(`Application is Running on ${PORT}: MODE: ${process.env.MODE}`);
});
