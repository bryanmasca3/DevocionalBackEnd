import AvanceService from "../services/avance.service.js";

const avanceService = new AvanceService();

export const getAllDevocionalAvance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await avanceService.getDevocionalAnual(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
