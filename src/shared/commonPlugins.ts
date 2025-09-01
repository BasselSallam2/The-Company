// plugins/hashPassword.plugin.ts
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export function hashPasswordPlugin(schema: Schema) {
schema.pre("save", async function (next) {
  const doc = this as any;


  if (doc.isNew || doc.isModified("password")) {
    try {
      doc.password = await bcrypt.hash(doc.password, 12);
    } catch (err) {
      return next(err as any);
    }
  }

  next();
});

 schema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as any;

    if (update.password) {
      try {
        update.password = await bcrypt.hash(update.password, 12);
      } catch (err) {
        return next(err as any);
      }
    }

    next();
  });


  schema.pre("updateOne", async function (next) {
    const update = this.getUpdate() as any;

    if (update.password) {
      try {
        update.password = await bcrypt.hash(update.password, 12);
      } catch (err) {
        return next(err as any);
      }
    }

    next();
  });
}