import Joi from "joi";
import joiObjectid from "joi-objectid";

const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const textLong = Joi.string().trim().min(1);

const respuestaItemSchema = Joi.object({
  id_elemento: idGen.required(),
  texto_ingresado: textLong.required(),
  id_pregunta: idGen.required(),
  // Se ignora: el usuario se toma del token. Se acepta para no romper el frontend.
  id_usuario: idGen.optional(),
});

export const createRespuestaSchema = Joi.array()
  .items(respuestaItemSchema)
  .min(1)
  .required();



export const createRespuestaReflexivaSchema = Joi.object({
  // Se ignora: el usuario se toma del token. Se acepta para no romper el frontend.
  id_usuario: idGen.optional(),

  id_devocional: idGen
    .required()
    .messages({
      "string.empty": "El id del devocional es obligatorio",
      "any.required": "El id del devocional es obligatorio",
    }),

  ensenanzas: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .messages({
      "array.base": "Enseñanzas debe ser un arreglo de texto",
    }),

  curiosidades: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .messages({
      "array.base": "Curiosidades debe ser un arreglo de texto",
    }),

  preguntas: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .messages({
      "array.base": "Preguntas debe ser un arreglo de texto",
    }),
});

export const updateRespuestaSchema = Joi.object({
  id_elemento: idGen.optional(),
  texto_ingresado: textLong.optional(),
  success: Joi.boolean().optional(),
});

export const getRespuestaSchema = Joi.object({
  id: idGen.required(),
});
