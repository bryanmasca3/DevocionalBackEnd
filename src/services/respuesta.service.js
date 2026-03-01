import { RespuestaModel } from "./../models/respuesta.model.js";
import { ElementoModel } from "./../models/elemento.model.js";
import { TipoElementoModel } from "./../models/tipoElemento.model.js";
import Boom from "@hapi/boom";
import { PreguntaUsuarioModel } from "../models/preguntaUsuario.model.js";
class RespuestaService {
  
  async createRespuesta(data) {
    if (!data || data.length === 0) {
      throw Boom.badRequest("No se enviaron respuestas");
    }

    const idPregunta = data[0].id_pregunta;
    const idUsuario = data[0].id_usuario;

    const tipoTexto = await TipoElementoModel.findOne({ descripcion: "texto" });

    if (!tipoTexto) {
      throw Boom.notFound("Tipo texto no encontrado");
    }

    const totalElementos = await ElementoModel.countDocuments({
      id_pregunta: idPregunta,
      id_tipo: tipoTexto._id,
    });

    const payload = await Promise.all(
      data.map(async (d) => {
        const elemento = await ElementoModel.findById(d.id_elemento);
        if (!elemento) throw Boom.notFound("Elemento no encontrado");

        return {
          texto_ingresado: d.texto_ingresado,
          id_elemento: d.id_elemento,
          id_usuario: idUsuario,
          success:
            d.texto_ingresado.trim().toUpperCase() ===
            elemento.respuesta.trim().toUpperCase(),
        };
      }),
    );

    const countSuccess = payload.filter((d) => d.success).length;

    const success = countSuccess === totalElementos;
    const completed = payload.length === totalElementos;

    await PreguntaUsuarioModel.findOneAndUpdate(
      { id_pregunta: idPregunta, id_usuario: idUsuario },
      { success, completed },
      { upsert: true, new: true },
    );

    return await RespuestaModel.insertMany(payload);
  }

  async actualizarRespuesta(id, datosAActualizar) {
    const usuarioActualizado = await RespuestaModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true },
    );

    return usuarioActualizado;
  }
  async getOneRespuesta(id) {
    const usuario = await RespuestaModel.findById(id);

    if (!usuario) throw Boom.notFound("Respuesta no encontrado");

    return usuario;
  }
  async getAllRespuesta() {
    const usuarios = await RespuestaModel.find();
    return usuarios;
  }

  async deleteRespuesta(id) {
    await RespuestaModel.findByIdAndDelete(id);
    return true;
  }
}
export default RespuestaService;
