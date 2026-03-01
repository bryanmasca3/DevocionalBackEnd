import { UsuarioModel } from "./../models/usuario.model.js";
import { TipoUsuarioModel } from "./../models/tipoUsuario.model.js";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class LoginService {
  async validate(correo, contrasena) {
    const user = await UsuarioModel.findOne({ correo }).populate("id_tipo");

    if (!user) {
      throw Boom.unauthorized("Usuario o contraseña incorrectos");
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      throw Boom.unauthorized("Usuario o contraseña incorrectos");
    }

    /*     const tipo = await TipoUsuarioModel.findOne({ id_tipo: user.id_tipo }); */

    const payload = {
      sub: user._id,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "mi_llave_secreta_123",
      {
        expiresIn: "24h", // El token expira en un día
      },
    );

    return {
      user: {
        _id: user._id,
        usuario: user.usuario,
        correo: user.correo,
        tipo: user.id_tipo.descripcion,
        login_inicial: user.login_inicial,
        token: token
        /* tipo: tipo, */
      },
      token,
    };
  }

  async actualizarContrasena(correo, nuevaContrasena) {
    const user = await UsuarioModel.findOne({ correo }).populate("id_tipo");

    if (!user) {
      throw Boom.unauthorized("Usuario o contraseña incorrectos");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

    const response = await UsuarioModel.findByIdAndUpdate(user._id, {
      contrasena: hashedPassword,
      login_inicial: false,
    },{
      new: true
    });
    const payload = {
      sub: user._id,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "mi_llave_secreta_123",
      {
        expiresIn: "24h", // El token expira en un día
      },
    );
    console.log(".......................")  ;
    console.log(response);
    return {
      user: {
        _id: response._id,
        usuario: response.usuario,
        correo: response.correo,
        tipo: user.id_tipo.descripcion,
        login_inicial: response.login_inicial
      },
      token,
    };
  }
}
export default LoginService;
