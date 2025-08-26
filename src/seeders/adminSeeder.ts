import { UserModel } from "@/modules/User/user.schema.js";
import dotenv from "dotenv";
dotenv.config();
import { Permessions } from "@/utils/interfaces.js";

const seedAdmin = async () => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount === 0) {
    const allPermessions = Object.values(Permessions);
    const admin = await UserModel.create({
      name: process.env.ADMIN_NAME,
      password: process.env.ADMIN_PASSWORD,
      phoneNumber: "1234567890",
      jobTitle: "Admin",
      role: "Admin",
      permessions: [...allPermessions],
    });
  }
};

export { seedAdmin };
