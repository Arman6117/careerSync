import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hellow Node");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
