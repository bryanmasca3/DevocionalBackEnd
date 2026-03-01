import { PreguntaModel } from "./../models/pregunta.model.js";
import Boom from "@hapi/boom";
class PreguntaService {
  async createPregunta(data) {
    const response = await PreguntaModel.create(data);
    return response;
  }

  async actualizarPregunta(id, datosAActualizar) {
    const usuarioActualizado = await PreguntaModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true },
    );

    return usuarioActualizado;
  }
  async getOnePregunta(id) {
    const usuario = await PreguntaModel.findById(id);

    if (!usuario) throw Boom.notFound("Pregunta no encontrado");

    return usuario;
  }
  async getAllPregunta(query) {
    const usuarios = await PreguntaModel.find(query);
    console.log(usuarios);
    return usuarios;
  }

  async deletePregunta(id) {
    await PreguntaModel.findByIdAndDelete(id);
    return true;
  }
}
export default PreguntaService;
