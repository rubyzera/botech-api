import { StorageService } from "../services/storage.service.js";

const StorageGetAll = async (req, res) => {
  try {
    res.status(200).send(await StorageService.getAll());
  } catch (e) {
    res.handleHttpError(e);
  }
};

const StorageCreate = async (req, res) => {
  try {
    const { body } = req;

    res.status(200).send(await StorageService.create(body));
  } catch (e) {
    res.handleHttpError(e);
  }
};

const StorageItemQuantity = async (req, res) => {
  try {
    const {
      params: { idItem },
      body,
    } = req;

    res
      .status(200)
      .send(await StorageService.changeItemQuantity(body.quantity, idItem));
  } catch (e) {
    res.handleHttpError(e);
  }
};

const StorageItemDelete = async (req, res) => {
  try {
    const {
      params: { idStorage },
    } = req;
    res.status(200).send(await StorageService.deleteItem(idStorage));
  } catch (e) {
    res.handleHttpError(e);
  }
};

export { StorageGetAll, StorageCreate, StorageItemQuantity, StorageItemDelete };
