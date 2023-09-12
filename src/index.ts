import { Elysia } from "elysia";
import z from "zod";

import user from "./routes/user";

const createSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const app = new Elysia();

app.use(user);

app.state("version", 1).get("/hello", () => {
  return ("Hello World!");
});

app.post("/create", (req) => {
  const { name, email } = createSchema.parse(req.body);
  const { language } = req.headers;

  return {
    name,
    email,
    language,
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
