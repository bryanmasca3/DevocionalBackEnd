import { Router } from "express";
import {
  validate,
  actualizarContrasena,
} from "./../../controllers/login.controller.js";
import { actualizarContrasenaSchema } from "../../schemas/login.schema.js";
import validatorHandler from "./../../middlewares/validatorHandler.js";
const router = Router();

router.post("/", validate);

router.post(
  "/actualizar-contrasena",
  validatorHandler(actualizarContrasenaSchema, "body"),
  actualizarContrasena,
);
export default router;
