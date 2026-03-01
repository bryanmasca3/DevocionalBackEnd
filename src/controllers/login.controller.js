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

    
    const { correo, nuevaContrasena } = req.body;
    const response = await loginServices.actualizarContrasena(
      correo,
      nuevaContrasena,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};
