import { CommandService } from "../services/commands.service.js";

const CommanGetAll = async (req, res) => {
  try {
    res.status(200).send(await CommandService.getAll());
  } catch (e) {
    res.handleHttpError(e);
  }
};

const CommandCreate = async (req, res) => {
  try {
    const { body } = req;

    res.status(200).send(await CommandService.create(body, req.decoded.id));
  } catch (e) {
    res.handleHttpError(e);
  }
};

const CommandFinish = async (req, res) => {
  try {
    const {
      params: { idCommand },
      body,
    } = req;
    res
      .status(200)
      .send(await CommandService.finish(body.status, idCommand, req.decoded.id));
  } catch (e) {
    res.handleHttpError(e);
  }
};

export { CommanGetAll, CommandCreate, CommandFinish };
