import Joi from "joi";
import joiObjectid from "joi-objectid";

const stringStandard = Joi.string().max(255);

export const actualizarContrasenaSchema = Joi.object({
  correo: stringStandard.required(),
  nuevaContrasena: stringStandard.required(),
});
