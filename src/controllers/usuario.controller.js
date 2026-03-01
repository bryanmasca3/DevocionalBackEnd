import UsuarioService from "../services/usuario.service.js";

const usuarioServices = new UsuarioService();

export const createUsuario = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("----------------------------");
    console.log(data);
    console.log("*****************************");
    const response = await usuarioServices.createUsuario(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const response = await usuarioServices.actualizarUsuario(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await usuarioServices.getOneUsuario(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllUsuario = async (req, res, next) => {
  try {
    const response = await usuarioServices.getAllUsuario();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await usuarioServices.deleteUsuario(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createTipoUsuario = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await usuarioServices.createTipoUsuario(data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const actualizarTipoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await usuarioServices.actualizarTipoUsuario(id, data);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getOneTipoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await usuarioServices.getOneTipoUsuario(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllTipoUsuario = async (req, res, next) => {
  try {
    const response = await usuarioServices.getAllTipoUsuario();
    res.json(response);
  } catch (error) {
    next(error);
  }
};
export const deleteTipoUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await usuarioServices.deleteTipoUsuario(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
