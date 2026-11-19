import boom from "@hapi/boom";

export default function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      // return: sin esto la petición inválida seguía hasta el controlador
      return next(
        boom.badRequest(error.details.map((d) => d.message).join(", ")),
      );
    }
    next();
  };
}
