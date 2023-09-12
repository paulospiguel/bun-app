import Elysia from "elysia";
import InMemory from "../inMemory/user";
import { userCreateSchema } from "../types/user";

const users = new Elysia({ prefix: "/user" });

const database = new InMemory();

users.get("/", async (context) => {
  return await database.get();
});

users.post("/create", async (context) => {
  const { name, email } = userCreateSchema.parse(context.body);

  if (!name || !email) {
    context.set.status = 400;

    return {
      error: "Missing name or email",
    }
  }

  await database.create({ name, email });

  context.set.status = 201;

  return null;
});

users.put("/:id", async (context) => {
  const { id } = context.params;
  const { name, email } = userCreateSchema.parse(context.body);

  if (!name || !email) {
    context.set.status = 400;
    return {
      error: "Missing name or email",
    }
  }

  await database.update(id, { name, email });

  context.set.status = 204;
  return null;
});

users.delete("/:id", async (context) => {
  const { id } = context.params;

  await database.delete(id);

  context.set.status = 204;

  return null;
});

export default users;
