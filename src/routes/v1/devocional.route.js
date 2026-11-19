import { Router } from "express";
import {
  createDevocional,
  actualizarDevocional,
  getOneDevocional,
  deleteDevocional,
  getAllDevocional,
  actualizarDevocionalUsuario,
  getDevocionales,
  actualizarDevocionalUsuarioRepairBugAll,
} from "./../../controllers/devocional.controller.js";
import {
  createDevocionalSchema,
  getDevocionalchemas,
  updateDevocionalSchema,
} from "./../../schemas/devocional.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";
import { authMiddleware, requireAdmin } from "../../middlewares/authMiddleware.js";

const router = Router();

/* ====== USUARIO AUTENTICADO ====== */
router.get("/usuario", authMiddleware, getAllDevocional);

router.get(
  "/:id/usuario",
  authMiddleware,
  validatorHandler(getDevocionalchemas, "params"),
  getOneDevocional,
);

// Recalcula el estado (completed/success) del devocional para el usuario del token
router.put(
  "/:id/usuario",
  authMiddleware,
  validatorHandler(getDevocionalchemas, "params"),
  actualizarDevocionalUsuario,
);

/* ====== ADMINISTRADOR ====== */
router.get("/", requireAdmin, getDevocionales);

router.post(
  "/",
  requireAdmin,
  validatorHandler(createDevocionalSchema, "body"),
  createDevocional,
);

router.post(
  "/repair-all-devocional-usuario",
  requireAdmin,
  actualizarDevocionalUsuarioRepairBugAll,
);

router.put(
  "/:id",
  requireAdmin,
  validatorHandler(getDevocionalchemas, "params"),
  validatorHandler(updateDevocionalSchema, "body"),
  actualizarDevocional,
);

router.delete(
  "/:id",
  requireAdmin,
  validatorHandler(getDevocionalchemas, "params"),
  deleteDevocional,
);

export default router;
