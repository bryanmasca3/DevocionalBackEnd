import { Router } from "express";
import { getAllDevocionalAvance } from "./../../controllers/avance.controller.js";
import { requireSelfOrAdmin } from "../../middlewares/authMiddleware.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";
import { getUsuarioSchema } from "./../../schemas/usuario.schema.js";

const router = Router();

// Un usuario solo ve su propio avance; el administrador ve el de cualquiera
router.get(
  "/:id/usuario",
  requireSelfOrAdmin("id"),
  validatorHandler(getUsuarioSchema, "params"),
  getAllDevocionalAvance,
);

export default router;
