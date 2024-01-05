import MONGO_DB_CONFIG from "../config/app.config";
import { User, IUserDocument, IUser } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as auth from "../middleware/auth";

export const creatUser = async (user: IUser): Promise<IUserDocument> => {
  try {
    if (!user.email) {
      throw new Error("User not found");
    }

    let isUserExist = await User.findOne({ email: user.email });
    if (isUserExist) {
      throw new Error("Emil Already Registerd");
    }

    const password = user.password;
    const hash = bcrypt.hashSync(
      password + MONGO_DB_CONFIG.BCRYPT_PASSWORD,
      MONGO_DB_CONFIG.SALT_ROUND,
    );

    const newUser = new User({
      ...user,
      password: hash,
    });
    const token = auth.generateAccessToken(newUser.toJSON());
    newUser.token = token;
    await newUser.save();

    return newUser as IUserDocument;
  } catch (error) {
    throw new Error(`Could not creat user ${error}`);
  }
};

export const getAllUser = async (params: {
  page?: string;
  pageSize?: string;
}) => {
  try {
    const perPage =
      Math.abs(parseInt(params.pageSize!)) || MONGO_DB_CONFIG.PAGE_SIZE;
    const page = (Math.abs(parseInt(params.page!)) || 1) - 1;

    const user = await User.find()
      .limit(perPage)
      .skip(page * perPage);
    return user;
  } catch (error) {
    throw new Error(`Users not found ${error}`);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (
      user &&
      (await bcrypt.compare(
        password + process.env.BCRYPT_PASSWORD,
        user.password,
      ))
    ) {
      const token = auth.generateAccessToken(user);
      return user;
    }
    // console.log(passwordMatch);
    return null;
  } catch (error) {
    throw new Error(`Log in faild ${error}`);
  }
};

export const deleteUser = async (id: string) => {
  try {
    // console.log(id);
    const user = await User.findByIdAndDelete(id).lean();
    // console.log(user);
    return user;
  } catch (error) {
    throw new Error(`Delete faild ${error}`);
  }
};
