export const HandleHttpError = (req, res, next) => {
  res.handleHttpError = ({ message }, status = 500) => {
    res.status(status).send({ error: true, message });
  };
  next();
};
