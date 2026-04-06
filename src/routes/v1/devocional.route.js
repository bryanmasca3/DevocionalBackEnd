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
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  validatorHandler(createDevocionalSchema, "body"),
  createDevocional,
);
router.post("/repair-all-devocional-usuario", actualizarDevocionalUsuarioRepairBugAll);
router.put(
  "/:id/usuario",
  authMiddleware,
  validatorHandler(getDevocionalchemas, "params"),
  validatorHandler(updateDevocionalSchema, "body"),
  actualizarDevocionalUsuario,
);

router.put(
  "/:id",
  validatorHandler(getDevocionalchemas, "params"),
  validatorHandler(updateDevocionalSchema, "body"),
  actualizarDevocional,
);

router.get("/usuario", authMiddleware, getAllDevocional);

router.get(
  "/:id/usuario",
  authMiddleware,
  validatorHandler(getDevocionalchemas, "params"),
  getOneDevocional,
);
router.get("/", getDevocionales);
router.delete(
  "/:id",
  validatorHandler(getDevocionalchemas, "params"),
  deleteDevocional,
);

export default router;
