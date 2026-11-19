import Joi from "joi";

const stringStandard = Joi.string().max(255);

export const loginSchema = Joi.object({
  correo: stringStandard.trim().required(),
  contrasena: stringStandard.required(),
});

export const actualizarContrasenaSchema = Joi.object({
  // Se ignora: el usuario se toma del token. Se acepta para no romper el frontend.
  correo: stringStandard.optional().allow(""),
  nuevaContrasena: stringStandard.min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});
