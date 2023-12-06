import { mongoose } from "mongoose";

const { Schema, model } = mongoose;

const Storage = new Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      name: { type: String, required: true },
      image: {
        type: Schema.Types.Mixed,
        data: Buffer,
        contentType: String,
        required: false,
        set: (val) => {
          if (typeof val === "string") {
            return Buffer.from(val, "base64");
          }
          return val;
        },
      },
      price: {
        purchase: { type: Number, required: true },
        sale: { type: Number, required: true },
      },
    },
  },
  {
    collection: "storage",
    runGettersOnQuery: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

export const StorageModel = model("storage", Storage);
