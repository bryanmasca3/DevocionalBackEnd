import jwt from "jsonwebtoken";
import Boom from "@hapi/boom";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(Boom.unauthorized("Token requerido"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mi_llave_secreta_123"
    );
    req.user = decoded; 
    next();
  } catch (error) {
    next(Boom.unauthorized("Token inválido"));
  }
};