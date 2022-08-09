import path from "path";
import dotenv from "dotenv";
import { z } from "zod";


dotenv.config({ path: path.join(__dirname, "../../../.env") });

export const env = z
  .object({
    API_PORT: z.string(),
  })
  .parse(process.env);
