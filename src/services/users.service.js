import moment from "moment/moment.js";
import { UserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (payload) => {
  const { JWT_SECRET } = process.env;
  return jwt.sign(
    {
      id: payload._id,
      iat: moment().unix(),
      exp: moment().add(1, "day").unix(),
    },
    JWT_SECRET
  );
};

const getAll = async () => {
  const users = await UserModel.find();
  return users.map(({ _doc: { password, ...safeValues } }) => safeValues);
};

const create = async (data) => {
  const requiredPaths = ["name", "user", "email", "password"];
  const wrongFields = requiredPaths.filter((path) => !data[path]);

  if (wrongFields.length) {
    throw { error: true, wrongFields, message: "required field" };
  }

  const encryptedPassword = bcrypt.hashSync(data.password, 2);
  const isRegistered = await UserModel.findOne({
    $or: [{ email: data.email }, { user: data.user }],
  });

  if (isRegistered) {
    const alreadyExists = data.email === isRegistered.email ? "email" : "user";
    throw {
      error: true,
      message: `this ${alreadyExists} is already registered`,
      wrongFields: [alreadyExists],
    };
  }

  return await UserModel.create({
    ...data,
    error: false,
    password: encryptedPassword,
  });
};

const login = async (data) => {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) {
    throw { message: "Não é possível encontrar este usuário", found: false };
  }
  if (bcrypt.compareSync(data.password, user.password)) {
    return { token: createToken(user), user: user.user };
  } else {
    throw { message: "senha incorreta", found: true };
  }
};

const verify = async (userToken) => {
  return { verified: !!jwt.verify(userToken, process.env.JWT_SECRET) };
};

export const UserService = { getAll, create, login, verify };
