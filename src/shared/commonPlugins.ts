// plugins/hashPassword.plugin.ts
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export function hashPasswordPlugin(schema: Schema) {
  schema.pre("save", async function (next) {
    const doc = this as any;
    try {
     doc.password = await bcrypt.hash(doc.password, 12);
      next();
    } catch (err) {
      next(err as any);
    }
  });
}
