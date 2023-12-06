import jwt from "jsonwebtoken";

const excludeUrls = ["/login", "/verifyJwt", "/users"];

export const AuthMiddleware = (req, res, next) => {
  try {
    if (excludeUrls.includes(req.path)) {
      next();
    } else {
      const { authorization } = req.headers;
      const { JWT_SECRET } = process.env;
      if (!authorization) {
        res
          .status(400)
          .send({ error: true, message: "url requer autenticação" });
      }
      const decoded = jwt.verify(authorization, JWT_SECRET);
      req.decoded = decoded;
      next();
    }
  } catch (e) {
    res.handleHttpError(e);
  }
};
