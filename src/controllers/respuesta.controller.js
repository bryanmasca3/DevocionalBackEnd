import RespuestaService from "../services/respuesta.service.js";

const respuestaServices = new RespuestaService();

export const createRespuesta = async (req, res, next) => {
  try {
    const data = req.body;
    
    const response = await respuestaServices.createRespuesta(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarRespuesta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await respuestaServices.actualizarRespuesta(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneRespuesta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await respuestaServices.getOneRespuesta(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllRespuesta = async (req, res, next) => {
  try {
    const response = await respuestaServices.getAllRespuesta();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deleteRespuesta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await respuestaServices.deleteRespuesta(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
