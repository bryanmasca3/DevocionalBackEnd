import { UsuarioModel } from "./../models/usuario.model.js";
import { TipoUsuarioModel } from "./../models/tipoUsuario.model.js";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
class UsuarioService {
  async createUsuario(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.contrasena, salt);
    const response = await UsuarioModel.create({
      ...data,
      contrasena: hashedPassword,
    });
    return response;
  }

  async actualizarUsuario(id, datosAActualizar) {

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(datosAActualizar.contrasena, salt);
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(
      id,
      {
        ...datosAActualizar,
        contrasena: hashedPassword,
      },
      { new: true },
    );
    console.log(usuarioActualizado);
    return usuarioActualizado;
  }
  async getOneUsuario(id) {
    const usuario = await UsuarioModel.findById(id);

    if (!usuario) throw Boom.notFound("Usuario no encontrado");

    return usuario;
  }
  async getAllUsuario() {
    const usuarios = await UsuarioModel.find().populate("id_tipo");
    return usuarios;
  }

  async deleteUsuario(id) {
    await UsuarioModel.findByIdAndDelete(id);
    return true;
  }

  async createTipoUsuario(data) {
    const response = await TipoUsuarioModel.create(data);
    return response;
  }

  async actualizarTipoUsuario(id, datosAActualizar) {
  
    const usuarioActualizado = await TipoUsuarioModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true },
    );

    return usuarioActualizado;
  }
  async getOneTipoUsuario(id) {
    const usuario = await TipoUsuarioModel.findById(id);

    if (!usuario) throw Boom.notFound("Usuario no encontrado");

    return usuario;
  }
  async getAllTipoUsuario() {
    const usuarios = await TipoUsuarioModel.find();
    return usuarios;
  }

  async deleteTipoUsuario(id) {
    await TipoUsuarioModel.findByIdAndDelete(id);
    return true;
  }
}
export default UsuarioService;
