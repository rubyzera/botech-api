import { UserService } from "../services/users.service.js";

const UserGetAll = async (req, res) => {
  try {
    res.status(200).send(await UserService.getAll(req.decoded));
  } catch (e) {
    res.handleHttpError(e);
  }
};

const UserCreate = async (req, res) => {
  try {
    const { body } = req;
    res.status(200).send(await UserService.create(body));
  } catch (e) {
    res
      .status(400)
      .send({ error: true, message: e.message, wrongFields: e?.wrongFields || [] });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { body } = req;
    res.send(await UserService.login(body));
  } catch (e) {
    res
      .status(e.notFound ? 404 : 400)
      .send({ error: true, message: e.message, found: e.found });
  }
};

const UserTokenVerify = async (req, res) => {
  try {
    const { token } = req.body;
    res.send(await UserService.verify(token));
  } catch (e) {
    res.send({ verified: false });
  }
};

export { UserGetAll, UserCreate, UserLogin, UserTokenVerify };
