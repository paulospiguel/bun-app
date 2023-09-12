import zod from "zod";

export const userCreateSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
});

