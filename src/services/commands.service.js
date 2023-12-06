import { CommandModel } from "../models/Command.model.js";
import { UserModel } from "../models/User.model.js";
import { StorageModel } from "../models/Storage.model.js";
import mongoose from "mongoose";

const getAll = async () => {
  const commands = await CommandModel.find().populate("items.item");
  return commands.map(({ _doc: { password, ...safeValues } }) => safeValues);
};

const create = async (data, userId) => {
  if (!data) {
    throw new Error("No content");
  }
  const { password, _id, ...createdBy } = await UserModel.findOne({
    _id: userId,
  });

  const promises = data.items.map(async ({ item, quantity }) => {
    const data = await StorageModel.findOneAndUpdate(
      { _id: item, quantity: { $gte: quantity } },
      { $inc: {
        quantity: -quantity
    } }
    );
    if(!data){
      throw new Error("Invalid Quantity in "+item+"-item");
    }
  });

  await Promise.all(promises)

  const commandInstance = new CommandModel({
    ...data,
    orderedIn: new Date(),
    finishedIn: null,
    status: "PREPARING",
    createdBy,
    finishedBy: null,
  });

  const { _doc: resp } = await commandInstance.save();
  return resp;
};

const finish = async (status, commandId, userId) => {
  if (!(status && commandId && userId)) {
    throw new Error("No content");
  }

  const {
    _doc: { _id, password, ...finishedBy },
  } = await UserModel.findOne({
    _id: userId,
  });

  const { _doc: finishedCommand } = await CommandModel.findOneAndUpdate(
    { _id: commandId },
    { status: status, finishedBy, finishedIn: new Date() }
  );

  return { finishedCommand };
};

export const CommandService = { getAll, create, finish };
