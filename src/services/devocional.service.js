import { DevocionalModel } from "./../models/devocional.model.js";
import { DevocionalUsuarioModel } from "./../models/devocionalUsuario.model.js";
import { RespuestaModel } from "../models/respuesta.model.js";
import { PreguntaModel } from "./../models/pregunta.model.js";
import { ElementoModel } from "./../models/elemento.model.js";

import { TipoElementoModel } from "./../models/tipoElemento.model.js";
import Boom from "@hapi/boom";
import { PreguntaUsuarioModel } from "../models/preguntaUsuario.model.js";
class DevocionalService {
  async createDevocional(data) {
    const response = await DevocionalModel.create(data);
    return response;
  }

  async createDevocionalUsuario(data) {
    const response = await DevocionalUsuarioModel.findOneAndUpdate(data);
    return response;
  }
  async updateDevocionalUsuario(usuarioId, devocionalId) {
    const pregunta = await PreguntaModel.find({
      id_devocional: devocionalId,
    });

    const preguntaUsuario = await Promise.all(
      pregunta.map(async (pregunta) => {
        const preguntaUsuario = await PreguntaUsuarioModel.findOne({
          id_pregunta: pregunta._id,
          id_usuario: usuarioId,
        });
        if (!preguntaUsuario) {
          return {
            success: false,
            completed: false,
          };
        }
        return {
          success: preguntaUsuario.success,
          completed: preguntaUsuario.completed,
        };
      }),
    );
    const completed = preguntaUsuario.every((pregunta) => pregunta.completed);
    const success = preguntaUsuario.every((pregunta) => pregunta.success);

    const response = await DevocionalUsuarioModel.findOneAndUpdate(
      { id_devocional: devocionalId, id_usuario: usuarioId },
      { completed: completed, success: success },
      { upsert: true, new: true },
    );
    return response;
  }
  async actualizarDevocional(id, datosAActualizar) {
    const usuarioActualizado = await DevocionalModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true },
    );

    return usuarioActualizado;
  }
  async getOneDevocional(id, userId) {
    const devocional = await DevocionalModel.findById(id);
    if (!devocional) throw Boom.notFound("Devocional no encontrado");

    const devocionalUsuario = await DevocionalUsuarioModel.findOne({
      id_devocional: devocional._id,
      id_usuario: userId,
    });

    const preguntas = await PreguntaModel.find({
      id_devocional: devocional._id,
    }).sort({ orden: 1 });

    const preguntasConElementos = await Promise.all(
      preguntas.map(async (pregunta) => {
        const elementos = await ElementoModel.find({
          id_pregunta: pregunta._id,
        })
          .populate("id_tipo")
          .sort({ orden: 1 });

        return {
          ...pregunta.toObject(),
          elementos: elementos,
        };
      }),
    );

    const todosElementosIds = preguntasConElementos.flatMap((p) =>
      p.elementos.map((e) => e._id),
    );

    const respuestas = await RespuestaModel.find({
      id_elemento: { $in: todosElementosIds },
      id_usuario: userId,
    });

    const respuestasMap = {};
    respuestas.forEach((r) => {
      respuestasMap[r.id_elemento.toString()] = r;
    });

    const preguntasFinal = preguntasConElementos.map((p) => ({
      ...p,
      elementos: p.elementos.map((e) => ({
        ...e.toObject(),
        id_respuesta: respuestasMap[e._id.toString()] || null,
      })),
    }));

    return {
      devocional,
      preguntas: preguntasFinal,
      reflexivo: devocionalUsuario
        ? {
            ensenanza: devocionalUsuario.ensenanza || [],
            curiosidad: devocionalUsuario.curiosidad || [],
            preguntas: devocionalUsuario.preguntas || [],
          }
        : {
            ensenanza: [],
            curiosidad: [],
            preguntas: [],
          },
    };
  }
  async getDevocionalAnual(usuarioId) {
    const now = new Date();
    const inicioAnio = new Date(now.getFullYear(), 0, 1);
    const finAnio = new Date(now.getFullYear() + 1, 0, 1);

    const devocionales = await DevocionalModel.find({
      fecha_publicacion: {
        $gte: inicioAnio,
        $lt: finAnio,
      },
    });

    const ids = devocionales.map((d) => d._id);

    const estados = await DevocionalUsuarioModel.find({
      id_devocional: { $in: ids },
      id_usuario: usuarioId,
    });

    const estadoMap = {};
    estados.forEach((e) => {
      estadoMap[e.id_devocional.toString()] = e;
    });

    return devocionales.map((dev) => ({
      ...dev.toObject(),
      success: estadoMap[dev._id.toString()]?.success ?? false,
    }));
  }
  async getDevocionales() {
    const devocionales = await DevocionalModel.find().sort({
      fecha_publicacion: -1,
    });

    return devocionales;
  }
  async getAllDevocional(usuarioId) {
    const now = new Date();

    const inicioMes = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );

    const finMes = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );

    const devocionales = await DevocionalModel.find({
      estado_publicacion: true,
      fecha_publicacion: {
        $gte: inicioMes,
        $lt: finMes,
      },
    }).sort({ fecha_publicacion: -1 });

    const devocionalesUsuario = await DevocionalUsuarioModel.find({
      id_usuario: usuarioId,
    });

    const mapaUsuario = new Map(
      devocionalesUsuario.map((d) => [d.id_devocional.toString(), d]),
    );

    const devocionalFinal = devocionales.map((dev) => {
      const devUsuario = mapaUsuario.get(dev._id.toString());

      return {
        ...dev.toObject(),
        success: devUsuario?.success ?? false,
        completed: devUsuario?.completed ?? false,
      };
    });

    return devocionalFinal;
  }

  async deleteDevocional(id) {
    await DevocionalModel.findByIdAndDelete(id);
    return true;
  }
}
export default DevocionalService;
