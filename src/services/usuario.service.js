import { UsuarioModel } from "./../models/usuario.model.js";
import { TipoUsuarioModel } from "./../models/tipoUsuario.model.js";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import config from "../config/env.config.js";

const hashear = async (texto) => {
  const salt = await bcrypt.genSalt(config.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(texto, salt);
};

class UsuarioService {
  async createUsuario(data) {
    const contrasena = data.contrasena || config.DEFAULT_USER_PASSWORD;
    if (!contrasena) {
      throw Boom.badRequest(
        "Debe enviar una contraseña (o configurar DEFAULT_USER_PASSWORD)",
      );
    }
    return UsuarioModel.create({
      ...data,
      contrasena: await hashear(contrasena),
    });
  }

  async actualizarUsuario(id, datosAActualizar) {
    const cambios = { ...datosAActualizar };
    // Solo se cambia la contraseña si se envía una nueva (antes se re-hasheaba el hash)
    if (cambios.contrasena) {
      cambios.contrasena = await hashear(cambios.contrasena);
    } else {
      delete cambios.contrasena;
    }
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, cambios, {
      new: true,
    });
    if (!usuarioActualizado) throw Boom.notFound("Usuario no encontrado");
    return usuarioActualizado;
  }

  async getOneUsuario(id) {
    const usuario = await UsuarioModel.findById(id);
    if (!usuario) throw Boom.notFound("Usuario no encontrado");
    return usuario;
  }

  async getAllUsuario() {
    return UsuarioModel.find().populate("id_tipo");
  }

  async deleteUsuario(id) {
    const usuario = await UsuarioModel.findByIdAndDelete(id);
    if (!usuario) throw Boom.notFound("Usuario no encontrado");
    return true;
  }

  async createTipoUsuario(data) {
    return TipoUsuarioModel.create(data);
  }

  async actualizarTipoUsuario(id, datosAActualizar) {
    const tipo = await TipoUsuarioModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!tipo) throw Boom.notFound("Tipo de usuario no encontrado");
    return tipo;
  }

  async getOneTipoUsuario(id) {
    const tipo = await TipoUsuarioModel.findById(id);
    if (!tipo) throw Boom.notFound("Tipo de usuario no encontrado");
    return tipo;
  }

  async getAllTipoUsuario() {
    return TipoUsuarioModel.find();
  }

  async deleteTipoUsuario(id) {
    const enUso = await UsuarioModel.exists({ id_tipo: id });
    if (enUso) {
      throw Boom.conflict("No se puede eliminar: hay usuarios con este tipo");
    }
    const tipo = await TipoUsuarioModel.findByIdAndDelete(id);
    if (!tipo) throw Boom.notFound("Tipo de usuario no encontrado");
    return true;
  }
}
export default UsuarioService;
