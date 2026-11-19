import { ElementoModel } from "./../models/elemento.model.js";
import { TipoElementoModel } from "./../models/tipoElemento.model.js";
import Boom from "@hapi/boom";
import { eliminarElementos } from "./cascade.service.js";

class ElementoService {
  async createElemento(data) {
    return ElementoModel.create(data);
  }

  async actualizarElemento(id, datosAActualizar) {
    const elemento = await ElementoModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!elemento) throw Boom.notFound("Elemento no encontrado");
    return elemento;
  }

  async getOneElemento(id) {
    const elemento = await ElementoModel.findById(id);
    if (!elemento) throw Boom.notFound("Elemento no encontrado");
    return elemento;
  }

  /** Solo se permite filtrar por id_pregunta (antes se pasaba req.query completo a Mongo). */
  async getAllElemento(query = {}) {
    const filtro = {};
    if (query.id_pregunta) filtro.id_pregunta = String(query.id_pregunta);
    return ElementoModel.find(filtro);
  }

  async deleteElemento(id) {
    const elemento = await ElementoModel.findById(id).select("_id").lean();
    if (!elemento) throw Boom.notFound("Elemento no encontrado");
    await eliminarElementos([elemento._id]);
    return true;
  }

  async createTipoElemento(data) {
    return TipoElementoModel.create(data);
  }

  async actualizarTipoElemento(id, datosAActualizar) {
    const tipo = await TipoElementoModel.findByIdAndUpdate(id, datosAActualizar, {
      new: true,
    });
    if (!tipo) throw Boom.notFound("Tipo de elemento no encontrado");
    return tipo;
  }

  async getOneTipoElemento(id) {
    const tipo = await TipoElementoModel.findById(id);
    if (!tipo) throw Boom.notFound("Tipo de elemento no encontrado");
    return tipo;
  }

  async getAllTipoElemento() {
    return TipoElementoModel.find();
  }

  async deleteTipoElemento(id) {
    const enUso = await ElementoModel.exists({ id_tipo: id });
    if (enUso) {
      throw Boom.conflict("No se puede eliminar: hay elementos con este tipo");
    }
    const tipo = await TipoElementoModel.findByIdAndDelete(id);
    if (!tipo) throw Boom.notFound("Tipo de elemento no encontrado");
    return true;
  }
}
export default ElementoService;
