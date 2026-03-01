import PreguntaService from "../services/pregunta.service.js";

const preguntaServices = new PreguntaService();

export const createPregunta = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await preguntaServices.createPregunta(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarPregunta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await preguntaServices.actualizarPregunta(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOnePregunta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await preguntaServices.getOnePregunta(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllPregunta = async (req, res, next) => {
  try {
    console.log(req.query);
    const response = await preguntaServices.getAllPregunta(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deletePregunta = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await preguntaServices.deletePregunta(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
