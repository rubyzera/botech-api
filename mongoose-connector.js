import { mongoose } from "mongoose";

export default (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
  });
};
