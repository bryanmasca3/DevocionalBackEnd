import jwt from "jsonwebtoken";
import Boom from "@hapi/boom";
import config from "../config/env.config.js";
import { UsuarioModel } from "../models/usuario.model.js";

/** Verifica el JWT y deja el payload en req.user ({ sub: idUsuario }). */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(Boom.unauthorized("Token requerido"));
  }
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, config.TOKEN.JWT);
    next();
  } catch (error) {
    next(Boom.unauthorized("Token inválido o expirado"));
  }
};

/** Carga el tipo de usuario desde la BD (así un cambio de rol aplica de inmediato). */
const cargarTipoUsuario = async (req) => {
  if (req.user.tipo !== undefined) return req.user.tipo;
  const usuario = await UsuarioModel.findById(req.user.sub)
    .populate("id_tipo")
    .lean();
  if (!usuario) throw Boom.unauthorized("Usuario no encontrado");
  req.user.tipo = usuario.id_tipo?.descripcion ?? null;
  return req.user.tipo;
};

const esAdmin = (tipo) => config.ADMIN_ROLES.includes(tipo);

/** Solo administradores. Incluye la verificación del token. */
export const requireAdmin = [
  authMiddleware,
  async (req, res, next) => {
    try {
      const tipo = await cargarTipoUsuario(req);
      if (!esAdmin(tipo)) {
        return next(Boom.forbidden("No tienes permisos para esta acción"));
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];

/** El propio usuario (req.params[param] === id del token) o un administrador. */
export const requireSelfOrAdmin = (param = "id") => [
  authMiddleware,
  async (req, res, next) => {
    try {
      if (String(req.params[param]) === String(req.user.sub)) return next();
      const tipo = await cargarTipoUsuario(req);
      if (!esAdmin(tipo)) {
        return next(Boom.forbidden("No tienes permisos para ver esta información"));
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
