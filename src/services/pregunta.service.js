import { PreguntaModel } from "./../models/pregunta.model.js";
import Boom from "@hapi/boom";
import { eliminarPreguntas } from "./cascade.service.js";

class PreguntaService {
  async createPregunta(data) {
    return PreguntaModel.create(data);
  }

  async actualizarPregunta(id, datosAActualizar) {
    const pregunta = await PreguntaModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!pregunta) throw Boom.notFound("Pregunta no encontrada");
    return pregunta;
  }

  async getOnePregunta(id) {
    const pregunta = await PreguntaModel.findById(id);
    if (!pregunta) throw Boom.notFound("Pregunta no encontrada");
    return pregunta;
  }

  /** Solo se permite filtrar por id_devocional (antes se pasaba req.query completo a Mongo). */
  async getAllPregunta(query = {}) {
    const filtro = {};
    if (query.id_devocional) filtro.id_devocional = String(query.id_devocional);
    return PreguntaModel.find(filtro);
  }

  async deletePregunta(id) {
    const pregunta = await PreguntaModel.findById(id).select("_id").lean();
    if (!pregunta) throw Boom.notFound("Pregunta no encontrada");
    await eliminarPreguntas([pregunta._id]);
    return true;
  }
}
export default PreguntaService;
