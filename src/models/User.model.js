import { mongoose } from "mongoose";

const {
  Schema,
  model,
} = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, set: (val)=>"@"+val },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("users", User);
