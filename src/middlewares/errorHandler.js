import mongoose from "mongoose";
import config from "../config/env.config.js";

// Loguea todos los errores (los 4xx de Boom en una sola línea)
export function logErrors(err, req, res, next) {
  const status = err.isBoom ? err.output.statusCode : err.status;
  if (status && status < 500) {
    console.warn(`[${req.method} ${req.originalUrl}] ${status} ${err.message}`);
  } else {
    console.error(`[${req.method} ${req.originalUrl}]`, err);
  }
  next(err);
}

const responder = (res, statusCode, error, message, data = null) =>
  res.status(statusCode).json({ statusCode, error, message, data });

// Errores de Mongoose / MongoDB
export function ormErrorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    return responder(
      res,
      400,
      "Bad Request",
      "Error de validación",
      Object.values(err.errors).map((e) => ({ campo: e.path, mensaje: e.message })),
    );
  }
  if (err instanceof mongoose.Error.CastError) {
    return responder(res, 400, "Bad Request", `Valor inválido para "${err.path}"`);
  }
  if (err?.code === 11000) {
    const campos = Object.keys(err.keyValue || {}).join(", ");
    return responder(res, 409, "Conflict", `Ya existe un registro con ese ${campos}`);
  }
  next(err);
}

// Errores de Boom
export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output, data } = err;
    return res.status(output.statusCode).json({
      ...output.payload,
      data: data || null,
    });
  }
  next(err);
}

// Cualquier otro error
export function errorHandler(err, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: config.IS_PRODUCTION ? "Error interno del servidor" : err.message,
    ...(config.IS_PRODUCTION ? {} : { errors: err.stack }),
  });
}

// Rutas no encontradas (404)
export function notFoundPageHandler(req, res, next) {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    message: "La ruta solicitada no existe en el servidor.",
  });
}
