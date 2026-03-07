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
  createRespuestaReflexivaSchema
} from "./../../schemas/respuesta.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";

const router = Router();

router.post(
  "/",
  validatorHandler(createRespuestaSchema, "body"),
  createRespuesta
);
router.post(
  "/reflexiva",
  validatorHandler(createRespuestaReflexivaSchema, "body"),
  createRespuestaReflexiva
);
router.put(
  "/:id",
  validatorHandler(getRespuestaSchema, "params"),
  validatorHandler(updateRespuestaSchema, "body"),
  actualizarRespuesta
);
router.get("/", getAllRespuesta);
router.get(
  "/:id",
  validatorHandler(getRespuestaSchema, "params"),
  getOneRespuesta
);
router.delete(
  "/:id",
  validatorHandler(getRespuestaSchema, "params"),
  deleteRespuesta
);

export default router;
