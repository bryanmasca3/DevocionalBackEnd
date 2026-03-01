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

export const updateRespuestaSchema = respuestaItemSchema;

export const getRespuestaSchema = Joi.object({
  id: idGen.required(),
});
