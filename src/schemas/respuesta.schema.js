import Joi from "joi";
import joiObjectid from "joi-objectid";

const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const textLong = Joi.string().trim().min(1);

const respuestaItemSchema = Joi.object({
  id_elemento: idGen.required(),
  texto_ingresado: textLong.required(),
  id_pregunta: idGen.optional(),
  //success: textLong.required(),
  id_usuario: idGen.required(),
});

export const createRespuestaSchema = Joi.array()
  .items(respuestaItemSchema)
  .min(1)
  .required();



export const createRespuestaReflexivaSchema = Joi.object({
  id_usuario: Joi.string()
    .required()
    .messages({
      "string.empty": "El id del usuario es obligatorio",
      "any.required": "El id del usuario es obligatorio",
    }),

  id_devocional: Joi.string()
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

export const updateRespuestaSchema = respuestaItemSchema;

export const getRespuestaSchema = Joi.object({
  id: idGen.required(),
});
