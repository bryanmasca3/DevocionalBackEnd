import { DevocionalModel } from "./../models/devocional.model.js";
import { UsuarioModel } from "./../models/usuario.model.js";
import { DevocionalUsuarioModel } from "./../models/devocionalUsuario.model.js";
import { RespuestaModel } from "../models/respuesta.model.js";
import { PreguntaModel } from "./../models/pregunta.model.js";
import { ElementoModel } from "./../models/elemento.model.js";
import { PreguntaUsuarioModel } from "../models/preguntaUsuario.model.js";
import Boom from "@hapi/boom";
import { eliminarDependenciasDevocional } from "./cascade.service.js";

class DevocionalService {
  async createDevocional(data) {
    return DevocionalModel.create(data);
  }

  /** Recalcula completed/success del devocional para un usuario a partir de sus preguntas. */
  async updateDevocionalUsuario(usuarioId, devocionalId) {
    const preguntas = await PreguntaModel.find({ id_devocional: devocionalId })
      .select("_id")
      .lean();

    const estados = await PreguntaUsuarioModel.find({
      id_pregunta: { $in: preguntas.map((p) => p._id) },
      id_usuario: usuarioId,
    }).lean();
    const estadoPorPregunta = new Map(
      estados.map((e) => [String(e.id_pregunta), e]),
    );

    const lista = preguntas.map(
      (p) =>
        estadoPorPregunta.get(String(p._id)) ?? { success: false, completed: false },
    );
    const completed = lista.every((p) => p.completed);
    const success = lista.every((p) => p.success);

    return DevocionalUsuarioModel.findOneAndUpdate(
      { id_devocional: devocionalId, id_usuario: usuarioId },
      { completed, success },
      { upsert: true, new: true },
    );
  }

  /**
   * Recalcula completed/success para cada par (usuario, devocional).
   * Solo para mantenimiento; puede tardar si hay muchos registros.
   */
  async repairAllDevocionalUsuario() {
    const [usuarios, devocionales] = await Promise.all([
      UsuarioModel.find().select("_id").lean(),
      DevocionalModel.find().select("_id").lean(),
    ]);

    const errors = [];
    let ok = 0;

    for (const u of usuarios) {
      for (const d of devocionales) {
        try {
          await this.updateDevocionalUsuario(u._id, d._id);
          ok += 1;
        } catch (err) {
          errors.push({
            id_usuario: u._id,
            id_devocional: d._id,
            message: err.message,
          });
        }
      }
    }

    return {
      usuarios: usuarios.length,
      devocionales: devocionales.length,
      totalPairs: usuarios.length * devocionales.length,
      ok,
      failed: errors.length,
      errors,
    };
  }

  async actualizarDevocional(id, datosAActualizar) {
    const devocional = await DevocionalModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!devocional) throw Boom.notFound("Devocional no encontrado");
    return devocional;
  }

  async getOneDevocional(id, userId) {
    const devocional = await DevocionalModel.findById(id);
    if (!devocional) throw Boom.notFound("Devocional no encontrado");

    const [devocionalUsuario, preguntas] = await Promise.all([
      DevocionalUsuarioModel.findOne({
        id_devocional: devocional._id,
        id_usuario: userId,
      }),
      PreguntaModel.find({ id_devocional: devocional._id }).sort({ orden: 1 }).lean(),
    ]);

    // Una sola consulta para todos los elementos (antes una por pregunta)
    const elementos = await ElementoModel.find({
      id_pregunta: { $in: preguntas.map((p) => p._id) },
    })
      .populate("id_tipo")
      .sort({ orden: 1 })
      .lean();

    const respuestas = await RespuestaModel.find({
      id_elemento: { $in: elementos.map((e) => e._id) },
      id_usuario: userId,
    })
      .sort({ fecha_ingresado: 1 })
      .lean();

    const respuestasMap = {};
    respuestas.forEach((r) => {
      respuestasMap[r.id_elemento.toString()] = r; // la más reciente gana
    });

    const elementosPorPregunta = {};
    elementos.forEach(({ respuesta, ...elemento }) => {
      const respuestaUsuario = respuestasMap[elemento._id.toString()] || null;
      const key = elemento.id_pregunta.toString();
      if (!elementosPorPregunta[key]) elementosPorPregunta[key] = [];
      elementosPorPregunta[key].push({
        ...elemento,
        // La respuesta correcta solo se envía cuando el usuario ya respondió
        ...(respuestaUsuario ? { respuesta: respuesta ?? "" } : {}),
        id_respuesta: respuestaUsuario,
      });
    });

    return {
      devocional,
      preguntas: preguntas.map((p) => ({
        ...p,
        elementos: elementosPorPregunta[p._id.toString()] || [],
      })),
      reflexivo: {
        ensenanza: devocionalUsuario?.ensenanza || [],
        curiosidad: devocionalUsuario?.curiosidad || [],
        preguntas: devocionalUsuario?.preguntas || [],
      },
    };
  }

  async getDevocionales() {
    return DevocionalModel.find().sort({ fecha_publicacion: -1 });
  }

  async getAllDevocional(usuarioId, { year, month } = {}) {
    const now = new Date();
    const y = year != null ? Number(year) : now.getUTCFullYear();
    const m = month != null ? Number(month) : now.getUTCMonth() + 1;
    if (!Number.isInteger(m) || m < 1 || m > 12 || !Number.isFinite(y)) {
      throw Boom.badRequest("year o month inválidos");
    }
    const inicioMes = new Date(Date.UTC(y, m - 1, 1));
    const finMes = new Date(Date.UTC(y, m, 1));

    const devocionales = await DevocionalModel.find({
      estado_publicacion: true,
      fecha_publicacion: { $gte: inicioMes, $lt: finMes },
    }).sort({ fecha_publicacion: -1 });

    const devocionalesUsuario = await DevocionalUsuarioModel.find({
      id_usuario: usuarioId,
      id_devocional: { $in: devocionales.map((d) => d._id) },
    });
    const mapaUsuario = new Map(
      devocionalesUsuario.map((d) => [d.id_devocional.toString(), d]),
    );

    return devocionales.map((dev) => {
      const devUsuario = mapaUsuario.get(dev._id.toString());
      return {
        ...dev.toObject(),
        success: devUsuario?.success ?? false,
        completed: devUsuario?.completed ?? false,
      };
    });
  }

  async deleteDevocional(id) {
    const devocional = await DevocionalModel.findByIdAndDelete(id);
    if (!devocional) throw Boom.notFound("Devocional no encontrado");
    await eliminarDependenciasDevocional(devocional._id);
    return true;
  }
}
export default DevocionalService;
