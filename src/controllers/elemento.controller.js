import ElementoService from "../services/elemento.service.js";

const elementoServices = new ElementoService();

export const createElemento = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await elementoServices.createElemento(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarElemento = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const response = await elementoServices.actualizarElemento(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneElemento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await elementoServices.getOneElemento(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllElemento = async (req, res, next) => {
  try {
    console.log(req.query);
    const response = await elementoServices.getAllElemento(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deleteElemento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await elementoServices.deleteElemento(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createTipoElemento = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await elementoServices.createTipoElemento(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const actualizarTipoElemento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await elementoServices.actualizarTipoElemento(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneTipoElemento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await elementoServices.getOneTipoElemento(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllTipoElemento = async (req, res, next) => {
  try {
    const response = await elementoServices.getAllTipoElemento();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deleteTipoElemento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await elementoServices.deleteTipoElemento(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
