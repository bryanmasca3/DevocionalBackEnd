import { Router } from "express";
import {
  createRespuesta,
  createRespuestaReflexiva,
  actualizarRespuesta,
  getOneRespuesta,
  deleteRespuesta,
  getAllRespuesta,
} from "./../../controllers/respuesta.controller.js";
import {
  createRespuestaSchema,
  getRespuestaSchema,
  updateRespuestaSchema,
  createRespuestaReflexivaSchema,
} from "./../../schemas/respuesta.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";
import { authMiddleware, requireAdmin } from "../../middlewares/authMiddleware.js";

const router = Router();

/* ====== USUARIO AUTENTICADO (id_usuario se toma del token) ====== */
router.post(
  "/",
  authMiddleware,
  validatorHandler(createRespuestaSchema, "body"),
  createRespuesta,
);
router.post(
  "/reflexiva",
  authMiddleware,
  validatorHandler(createRespuestaReflexivaSchema, "body"),
  createRespuestaReflexiva,
);

/* ====== ADMINISTRADOR ====== */
router.put(
  "/:id",
  requireAdmin,
  validatorHandler(getRespuestaSchema, "params"),
  validatorHandler(updateRespuestaSchema, "body"),
  actualizarRespuesta,
);
router.get("/", requireAdmin, getAllRespuesta);
router.get(
  "/:id",
  requireAdmin,
  validatorHandler(getRespuestaSchema, "params"),
  getOneRespuesta,
);
router.delete(
  "/:id",
  requireAdmin,
  validatorHandler(getRespuestaSchema, "params"),
  deleteRespuesta,
);

export default router;
