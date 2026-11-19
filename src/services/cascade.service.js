import { PreguntaModel } from "./../models/pregunta.model.js";
import { ElementoModel } from "./../models/elemento.model.js";
import { RespuestaModel } from "./../models/respuesta.model.js";
import { PreguntaUsuarioModel } from "./../models/preguntaUsuario.model.js";
import { DevocionalUsuarioModel } from "./../models/devocionalUsuario.model.js";

/** Borra elementos y las respuestas de usuarios asociadas. */
export async function eliminarElementos(elementoIds) {
  if (!elementoIds.length) return;
  await RespuestaModel.deleteMany({ id_elemento: { $in: elementoIds } });
  await ElementoModel.deleteMany({ _id: { $in: elementoIds } });
}

/** Borra preguntas con sus elementos, respuestas y estados por usuario. */
export async function eliminarPreguntas(preguntaIds) {
  if (!preguntaIds.length) return;
  const elementos = await ElementoModel.find({ id_pregunta: { $in: preguntaIds } })
    .select("_id")
    .lean();
  await eliminarElementos(elementos.map((e) => e._id));
  await PreguntaUsuarioModel.deleteMany({ id_pregunta: { $in: preguntaIds } });
  await PreguntaModel.deleteMany({ _id: { $in: preguntaIds } });
}

/** Borra todo lo que cuelga de un devocional (el devocional se borra aparte). */
export async function eliminarDependenciasDevocional(devocionalId) {
  const preguntas = await PreguntaModel.find({ id_devocional: devocionalId })
    .select("_id")
    .lean();
  await eliminarPreguntas(preguntas.map((p) => p._id));
  await DevocionalUsuarioModel.deleteMany({ id_devocional: devocionalId });
}
