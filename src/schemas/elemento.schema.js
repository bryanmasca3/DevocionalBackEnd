import Joi from "joi";
import joiObjectid from 'joi-objectid';
const joiOID = joiObjectid(Joi);
const idGen = joiOID();
const stringStandard = Joi.string().max(255);
// Textos de elementos (etiquetas pueden ser frases largas)
const textElemento = Joi.string().max(5000).allow("", null);

export const createElementoSchema = Joi.object({
  id_pregunta: idGen.required(),
  texto_ayuda: textElemento.optional(), 
  respuesta: textElemento.optional(), // Respuesta correcta o esperada
  id_tipo: idGen.required(), // Tipo de elemento
  orden: Joi.number().integer().required(),
  descripcion: textElemento.optional(),
});

export const updateElementoSchema = Joi.object({
  id_pregunta: idGen.required(),
  texto_ayuda: textElemento.optional(),
  respuesta: textElemento.optional(), // Respuesta correcta o esperada
  id_tipo: idGen.required(), // Tipo de elemento
  orden: Joi.number().integer().required(),
  descripcion: textElemento.optional(),
}); 

export const getTipoElementoSchema = Joi.object({
  id: idGen.required(),
});
export const createTipoElementoSchema = Joi.object({
  descripcion: stringStandard.required(),
});

export const updateTipoElementoSchema = Joi.object({
  descripcion: stringStandard.optional(),
});

export const getElementoSchema = Joi.object({
  id: idGen.required(),
});