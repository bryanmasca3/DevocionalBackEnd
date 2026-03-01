import { Router } from "express";
import devocionalRouter from "./devocional.route.js";
import usuarioRouter from "./usuario.route.js";
import elementoRouter from "./elemento.route.js";
import preguntaRouter from "./pregunta.route.js";
import loginRouter from "./login.route.js";
import respuestaRouter from "./respuesta.route.js";
import avanceRouter from "./avance.route.js";   


const router = Router();

router.use("/usuario", usuarioRouter);
router.use("/devocional",devocionalRouter);
router.use("/elemento", elementoRouter);
router.use("/pregunta", preguntaRouter);
router.use("/login", loginRouter);
router.use("/respuesta",respuestaRouter);
router.use("/avance",avanceRouter);
 

export default router;
