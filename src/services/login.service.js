import { UsuarioModel } from "./../models/usuario.model.js";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

const firmarToken = (userId) =>
  jwt.sign({ sub: userId }, config.TOKEN.JWT, {
    expiresIn: config.TOKEN.EXPIRES_IN,
  });

class LoginService {
  async validate(correo, contrasena) {
    const user = await UsuarioModel.findOne({
      correo: String(correo).trim().toLowerCase(),
    })
      .select("+contrasena")
      .populate("id_tipo");

    // Mismo mensaje en ambos casos para no revelar qué correos existen
    if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
      throw Boom.unauthorized("Usuario o contraseña incorrectos");
    }

    const token = firmarToken(user._id);

    return {
      user: {
        _id: user._id,
        nombre: user.nombre,
        usuario: user.usuario,
        correo: user.correo,
        tipo: user.id_tipo?.descripcion,
        login_inicial: user.login_inicial,
        token,
      },
      token,
    };
  }

  /** Cambia la contraseña del usuario autenticado (id tomado del token). */
  async actualizarContrasena(userId, nuevaContrasena) {
    const salt = await bcrypt.genSalt(config.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

    const response = await UsuarioModel.findByIdAndUpdate(
      userId,
      { contrasena: hashedPassword, login_inicial: false },
      { new: true },
    ).populate("id_tipo");

    if (!response) throw Boom.notFound("Usuario no encontrado");

    return {
      user: {
        _id: response._id,
        nombre: response.nombre,
        usuario: response.usuario,
        correo: response.correo,
        tipo: response.id_tipo?.descripcion,
        login_inicial: response.login_inicial,
      },
      token: firmarToken(response._id),
    };
  }
}
export default LoginService;
