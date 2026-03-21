import Joi from "joi";
import joiObjectid from "joi-objectid";

const joiOID = joiObjectid(Joi);
const idGen = joiOID();

const stringStandard = Joi.string().max(255);
const textLong = Joi.string();
const dateGen = Joi.date();
const booleanGen = Joi.boolean();

export const createDevocionalSchema = Joi.object({
  titulo: stringStandard.required(),
  descripcion: textLong.required(),
  fecha_publicacion: dateGen.default(Date.now),
  estado_publicacion: booleanGen.default(true),
  ensenanza: Joi.number().optional(),
  curiosidad: Joi.number().optional(),
  preguntas: Joi.number().optional(),
});

export const updateDevocionalSchema = Joi.object({
  titulo: stringStandard.optional(),
  descripcion: textLong.optional(),
  fecha_publicacion: dateGen.optional(),
  estado_publicacion: booleanGen.default(true),
  ensenanza: Joi.number().optional(),
  curiosidad: Joi.number().optional(),
  preguntas: Joi.number().optional(),
});

export const getDevocionalchemas = Joi.object({
  id: idGen.required(),
  idusuario: idGen.optional(),
});

/* export const createPreguntaDevocionalSchema = Joi.object({
  id_devocional: idGen.required(),
  id_pregunta: idGen.required(),
});


export const createFechaDevocionalSchema = Joi.object({
  id_devocional: idGen.required(),
  fecha: dateGen.required(),
});


export const createTipoSchema = Joi.object({
  descripcion: stringStandard.required(),
}); */
