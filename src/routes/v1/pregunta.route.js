import { Router } from "express";
import {
  createPregunta,
  actualizarPregunta,
  getOnePregunta,
  deletePregunta,
  getAllPregunta,
} from "./../../controllers/pregunta.controller.js";
import {
  createPreguntaSchema,
  getPreguntachemas,
  updatePreguntaSchema,
} from "./../../schemas/pregunta.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";

const router = Router();

router.post(
  "/",
  validatorHandler(createPreguntaSchema, "body"),
  createPregunta
);
router.put(
  "/:id",
  validatorHandler(getPreguntachemas, "params"),
  validatorHandler(updatePreguntaSchema, "body"),
  actualizarPregunta
);
router.get("/", getAllPregunta);
router.get(
  "/:id",
  validatorHandler(getPreguntachemas, "params"),
  getOnePregunta
);
router.delete(
  "/:id",
  validatorHandler(getPreguntachemas, "params"),
  deletePregunta
);

export default router;
