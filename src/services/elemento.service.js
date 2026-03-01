import { ElementoModel } from "./../models/elemento.model.js";
import { TipoElementoModel } from "./../models/tipoElemento.model.js";
import Boom from "@hapi/boom";
class ElementoService {
  async createElemento(data) {
    const response = await ElementoModel.create(data);
    return response;
  }

  async actualizarElemento(id, datosAActualizar) {
    const elementoActualizado = await ElementoModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true }
    );

    return elementoActualizado;
  }
  async getOneElemento(id) {
    const elemento = await ElementoModel.findById(id);

    if (!elemento) throw Boom.notFound("Elemento no encontrado");

    return elemento;
  }
  async getAllElemento(query) {
    const elementos = await ElementoModel.find(query);
    return elementos;
  }

  async deleteElemento(id) {
    await ElementoModel.findByIdAndDelete(id);
    return true;
  }

  async createTipoElemento(data) {
    const response = await TipoElementoModel.create(data);
    return response;
  }

  async actualizarTipoElemento(id, datosAActualizar) {
    const elementoActualizado = await TipoElementoModel.findByIdAndUpdate(
      id,
      datosAActualizar,
      { new: true }
    );

    return elementoActualizado;
  }
  async getOneTipoElemento(id) {
    const elemento = await TipoElementoModel.findById(id);

    if (!elemento) throw Boom.notFound("Elemento no encontrado");

    return elemento;
  }
  async getAllTipoElemento() {
    const elementos = await TipoElementoModel.find();
    return elementos;
  }

  async deleteTipoElemento(id) {
    await TipoElementoModel.findByIdAndDelete(id);
    return true;
  }
}
export default ElementoService;
