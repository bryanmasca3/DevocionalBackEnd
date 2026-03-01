import { Router } from "express";
import {
  createElemento,
  actualizarElemento,
  getOneElemento,
  deleteElemento,
  getAllElemento,
  createTipoElemento,
  actualizarTipoElemento,
  getOneTipoElemento,
  deleteTipoElemento,
  getAllTipoElemento,
} from "./../../controllers/elemento.controller.js";

import {
  createTipoElementoSchema,
  updateTipoElementoSchema,
  getTipoElementoSchema,
  createElementoSchema,
  getElementoSchema,
  updateElementoSchema,
} from "./../../schemas/elemento.schema.js";

import validatorHandler from "./../../middlewares/validatorHandler.js";

const router = Router();

/* ====== TIPO ELEMENTO ====== */
router.post(
  "/tipo",
  validatorHandler(createTipoElementoSchema, "body"),
  createTipoElemento
);

router.get("/tipo", getAllTipoElemento);

router.get(
  "/tipo/:id",
  validatorHandler(getTipoElementoSchema, "params"),
  getOneTipoElemento
);

router.put(
  "/tipo/:id",
  validatorHandler(getTipoElementoSchema, "params"),
  validatorHandler(updateTipoElementoSchema, "body"),
  actualizarTipoElemento
);

router.delete(
  "/tipo/:id",
  validatorHandler(getTipoElementoSchema, "params"),
  deleteTipoElemento
);

/* ====== ELEMENTO ====== */
router.post(
  "/",
  validatorHandler(createElementoSchema, "body"),
  createElemento
);

router.get("/", getAllElemento);

router.get(
  "/:id",
  validatorHandler(getElementoSchema, "params"),
  getOneElemento
);

router.put(
  "/:id",
  validatorHandler(getElementoSchema, "params"),
  validatorHandler(updateElementoSchema, "body"),
  actualizarElemento
);

router.delete(
  "/:id",
  validatorHandler(getElementoSchema, "params"),
  deleteElemento
);

export default router;
