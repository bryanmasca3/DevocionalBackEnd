import LoginService from "../services/login.service.js";

const loginServices = new LoginService();

export const validate = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;
    const response = await loginServices.validate(correo, contrasena);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarContrasena = async (req, res, next) => {
  try {
    // El usuario se toma del token: nadie puede cambiar la contraseña de otro
    const { nuevaContrasena } = req.body;
    const response = await loginServices.actualizarContrasena(
      req.user.sub,
      nuevaContrasena,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};
