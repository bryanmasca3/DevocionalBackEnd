import { RespuestaModel } from "./../models/respuesta.model.js";
import { ElementoModel } from "./../models/elemento.model.js";
import { TipoElementoModel } from "./../models/tipoElemento.model.js";
import { DevocionalUsuarioModel } from "./../models/devocionalUsuario.model.js";
import { PreguntaUsuarioModel } from "../models/preguntaUsuario.model.js";
import Boom from "@hapi/boom";

/** Quita espacios al inicio/final y deja un solo espacio entre palabras. */
const limpiar = (texto) => String(texto ?? "").trim().replace(/\s+/g, " ");
const normalizar = (texto) => limpiar(texto).toUpperCase();

class RespuestaService {
  async createRespuestaReflexiva(
    idUsuario,
    idDevocional,
    ensenanzas,
    curiosidades,
    preguntas,
  ) {
    return DevocionalUsuarioModel.findOneAndUpdate(
      { id_usuario: idUsuario, id_devocional: idDevocional },
      {
        ensenanza: ensenanzas,
        curiosidad: curiosidades,
        preguntas: preguntas,
      },
      { new: true, upsert: true },
    );
  }

  /**
   * Guarda las respuestas de un usuario a una pregunta.
   * - El usuario viene del token (no del body).
   * - Un elemento ya respondido no se sobreescribe (un solo intento, igual que en el frontend,
   *   que bloquea los campos ya respondidos). Así no se puede "probar" hasta acertar.
   */
  async createRespuesta(data, idUsuario) {
    if (!Array.isArray(data) || data.length === 0) {
      throw Boom.badRequest("No se enviaron respuestas");
    }

    const idPregunta = data[0].id_pregunta;

    const tipoTexto = await TipoElementoModel.findOne({ descripcion: "texto" });
    if (!tipoTexto) throw Boom.notFound("Tipo texto no encontrado");

    const idsElementos = data.map((d) => d.id_elemento);

    const [totalElementos, elementos, existentes] = await Promise.all([
      ElementoModel.countDocuments({ id_pregunta: idPregunta, id_tipo: tipoTexto._id }),
      ElementoModel.find({ _id: { $in: idsElementos } }).lean(),
      RespuestaModel.find({ id_elemento: { $in: idsElementos }, id_usuario: idUsuario })
        .sort({ fecha_ingresado: 1 })
        .lean(),
    ]);

    const elementoPorId = new Map(elementos.map((e) => [String(e._id), e]));
    const existentePorElemento = new Map(
      existentes.map((r) => [String(r.id_elemento), r]),
    );

    const nuevas = [];
    const resultados = data.map((d) => {
      const elemento = elementoPorId.get(String(d.id_elemento));
      if (!elemento) throw Boom.notFound("Elemento no encontrado");
      if (String(elemento.id_pregunta) !== String(idPregunta)) {
        throw Boom.badRequest("El elemento no pertenece a la pregunta");
      }

      const existente = existentePorElemento.get(String(d.id_elemento));
      if (existente) return { success: existente.success };

      const nueva = {
        texto_ingresado: limpiar(d.texto_ingresado),
        id_elemento: d.id_elemento,
        id_usuario: idUsuario,
        success: normalizar(d.texto_ingresado) === normalizar(elemento.respuesta),
      };
      nuevas.push(nueva);
      return nueva;
    });

    const countSuccess = resultados.filter((r) => r.success).length;
    const success = countSuccess === totalElementos;
    const completed = resultados.length === totalElementos;

    await PreguntaUsuarioModel.findOneAndUpdate(
      { id_pregunta: idPregunta, id_usuario: idUsuario },
      { success, completed },
      { upsert: true, new: true },
    );

    if (nuevas.length) await RespuestaModel.insertMany(nuevas);

    return RespuestaModel.find({
      id_elemento: { $in: idsElementos },
      id_usuario: idUsuario,
    });
  }

  async actualizarRespuesta(id, datosAActualizar) {
    const respuesta = await RespuestaModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!respuesta) throw Boom.notFound("Respuesta no encontrada");
    return respuesta;
  }

  async getOneRespuesta(id) {
    const respuesta = await RespuestaModel.findById(id);
    if (!respuesta) throw Boom.notFound("Respuesta no encontrada");
    return respuesta;
  }

  async getAllRespuesta() {
    return RespuestaModel.find();
  }

  async deleteRespuesta(id) {
    const respuesta = await RespuestaModel.findByIdAndDelete(id);
    if (!respuesta) throw Boom.notFound("Respuesta no encontrada");
    return true;
  }
}
export default RespuestaService;
