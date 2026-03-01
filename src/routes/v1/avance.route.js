import { Router } from "express";
import {  
  getAllDevocionalAvance, 
} from "./../../controllers/avance.controller.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id/usuario", authMiddleware, getAllDevocionalAvance);

export default router;
