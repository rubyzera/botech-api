import { mongoose } from "mongoose";
import { StorageModel } from "./Storage.model.js";

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose;

const Command = new Schema({
  tableNumber: { type: Number, required: true },
  createdBy: {
    name: { type: String, required: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
  },
  finishedBy: Schema.Types.Mixed,
  orderedIn: { type: Date, required: true },
  finishedIn: Schema.Types.Mixed,
  status: { type: String, enum: ['PREPARING', 'DONE', 'CANCELED'],required: true },
  items: [
    {
      item: { type: ObjectId, ref: 'storage', required: true },
      quantity: Number,
      observation: String,
    },
  ],
});

export const CommandModel = model("commands", Command);
