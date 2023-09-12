import z from "zod";
import { userCreateSchema } from "../types/user";

class UserInMemory {
  private users;

  constructor() {
    this.users = new Map();
  }

  async get() {
    return Array.from(this.users.entries()).map(([id, user]) => ({
      id,
      ...user,
    }));
  }

  async create(user: z.infer<typeof userCreateSchema>) {
    const id = crypto.randomUUID()
    this.users.set(id, user);
  }

  async delete(id: string) {
    this.users.delete(id);
  }

  async update(id: string, user: any) {
    this.users.set(id, user);
  }
}

export default UserInMemory;