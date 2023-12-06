import { StorageModel } from "../models/Storage.model.js";
import mongoose from "mongoose";

const getAll = async () => {
  const storageItems = await StorageModel.find({});
  return storageItems.map(
    ({ _doc: { password, ...safeValues } }) => safeValues
  );
};

const create = async ({ quantity, ...product }) => {
  if (!product) {
    throw new Error("No content");
  }

  const isRegistered = await StorageModel.findOne({
    ["product.name"]: product.name,
  });

  if (isRegistered) {
    throw {
      error: true,
      message: `this Product already registered`,
      wrongFields: ["name"],
    };
  }
  const storageInstance = new StorageModel({ product, quantity });

  const { _doc: resp } = await storageInstance.save();
  return resp;
};

const changeItemQuantity = async (quantity, itemId) => {
  if (!itemId) {
    throw new Error("No content");
  }

  const { _doc: editedStorageItem } = await StorageModel.findOneAndUpdate(
    { _id: itemId },
    { quantity }
  );

  return { editedStorageItem };
};

const deleteItem = async (itemId) => {
  if (!itemId) {
    throw new Error("No content");
  }

  await StorageModel.deleteOne({
    _id: itemId,
  });

  return { success: "true" };
};

export const StorageService = {
  getAll,
  create,
  changeItemQuantity,
  deleteItem,
};
