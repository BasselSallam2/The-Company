import { UserModel } from "@/modules/User/user.schema.js";
import dotenv from "dotenv";
dotenv.config();
import { Permessions } from "@/utils/interfaces.js";

const seedAdmin = async () => {
  const Admin = await UserModel.findOne({ role: "Admin" }).exec();
  if (!Admin) {
    const allPermessions = Object.values(Permessions);
    const admin = await UserModel.create({
      name: "Admin",
      password: "Admin1234",
      phoneNumber: "+20-1554673489",
      jobTitle: "Admin",
      role: "Admin",
      permessions: [...allPermessions],
    });
  }
};

export { seedAdmin };
