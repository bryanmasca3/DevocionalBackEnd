import DevocionalService from "../services/devocional.service.js";

const devocionalServices = new DevocionalService();

export const createDevocional = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await devocionalServices.createDevocional(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarDevocional = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await devocionalServices.actualizarDevocional(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const actualizarDevocionalUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idUsuario = req.user.sub;
    console.log(id, idUsuario);
    console.log("----------------DEVOCIONAL USUARIO------------");
    const response = await devocionalServices.updateDevocionalUsuario(
      idUsuario,
      id,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};
/* este es para arreglar el bug de la actualizacion de devocional usuario no se usar normalmente*/


export const actualizarDevocionalUsuarioRepairBugAll = async (req, res, next) => {
  try {
    const response = await devocionalServices.repairAllDevocionalUsuario();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneDevocional = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await devocionalServices.getOneDevocional(
      id,
      req.user.sub,
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getDevocionales = async (req, res, next) => {
  try {
    const response = await devocionalServices.getDevocionales();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const getAllDevocional = async (req, res, next) => {
  try {
    const idUsuario = req.user.sub;
    const year = req.query.year;
const month = req.query.month;
    const response = await devocionalServices.getAllDevocional(idUsuario, { year, month });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteDevocional = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await devocionalServices.deleteDevocional(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
