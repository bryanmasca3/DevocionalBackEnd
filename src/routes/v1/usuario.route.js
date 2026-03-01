import { Router } from "express";
import {
  createUsuario,
  actualizarUsuario,
  getOneUsuario,
  deleteUsuario,
  getAllUsuario,
  createTipoUsuario,
  actualizarTipoUsuario,
  getOneTipoUsuario,
  deleteTipoUsuario,
  getAllTipoUsuario,
} from "./../../controllers/usuario.controller.js";
import {
  createTipoUsuarioSchema,
  updateTipoUsuarioSchema,
  getTipoUsuarioSchema,
  createUsuarioSchema,
  getUsuarioSchema,
  updateUsuarioSchema,
} from "./../../schemas/usuario.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";

const router = Router();

router.post(
  "/tipo",
  validatorHandler(createTipoUsuarioSchema, "body"),
  createTipoUsuario,
);
router.put(
  "/tipo/:id",
  validatorHandler(getTipoUsuarioSchema, "params"),
  validatorHandler(updateTipoUsuarioSchema, "body"),
  actualizarTipoUsuario,
);
router.get("/tipo", getAllTipoUsuario);
router.get(
  "/tipo/:id",
  validatorHandler(getTipoUsuarioSchema, "params"),
  getOneTipoUsuario,
);
router.delete(
  "/tipo/:id",
  validatorHandler(getTipoUsuarioSchema, "params"),
  deleteTipoUsuario,
);

router.post("/", validatorHandler(createUsuarioSchema, "body"), createUsuario);
router.put(
  "/:id",
  validatorHandler(getUsuarioSchema, "params"),
  validatorHandler(updateUsuarioSchema, "body"),
  actualizarUsuario,
);
router.get("/:id", validatorHandler(getUsuarioSchema, "params"), getOneUsuario);
router.get("/", getAllUsuario);
router.delete(
  "/:id",
  validatorHandler(getUsuarioSchema, "params"),
  deleteUsuario,
);

export default router;
