import { ValidationError } from "sequelize"; // Importa los errores que existen
import boom from "@hapi/boom";

// Middleware para loguear todos los errores
export function logErrors(err, req, res, next) {
  console.log("--- 1. Log Error ---");
  console.error(err);
  next(err); // pasa al siguiente middleware de error
}

// Middleware para manejar errores espec�ficos de Sequelize
export function ormErrorHandler(err, req, res, next) {
  console.log("--- 2. ORM Error ---");

  // Si el error es una instancia de ValidationError
  if (err instanceof ValidationError) {
    return res.status(409).json({
      status: 409,
      message: "Error de validaci�n",
      errors: err.errors,
    });
  }

  // Verificamos si el error proviene de la conexi�n
  if (err.name && err.name === "SequelizeConnectionError") {
    return res.status(500).json({
      status: 500,
      message: "Error al conectar con la base de datos",
      details: err.message,
    });
  }

  // Si no es un error conocido, lo pasamos al siguiente middleware
  next(err);
}

// Middleware para manejar errores de Boom
export function boomErrorHandler(err, req, res, next) {
  console.log("--- 3. Boom Error ---");
  if (err.isBoom) {
    const { output, data } = err;
    return res.status(output.statusCode).json({
      ...output.payload,
      data: data || null, // devolvemos el "data" que contiene el error real
    });
  }
  next(err); // si no es Boom, pasa al siguiente
}

// Middleware para manejar errores generales (cualquier otro error)
export function errorHandler(err, req, res, next) {
  console.log("--- 4. General Error ---");
  res.status(500).json({
    status: 500,
    message: err.message,
    errors: err.stack,
  });
}

// Middleware para manejar rutas no encontradas (404)
export function notFoundPageHandler(req, res, next) {
  console.log("--- 5. 404 Not Found ---");
  res.status(404).json({
    status: 404,
    error: "Not Found",
    message: "La ruta solicitada no existe en el servidor.",
  });
}
