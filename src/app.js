import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import {
  notFoundPageHandler,
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from "./middlewares/errorHandler.js";
import helmet from "helmet";
import Boom from "@hapi/boom";
import config from "./config/env.config.js";
const app = express();

// Necesario detrás de un proxy (Render, Nginx...) para que req.ip sea la IP real
app.set("trust proxy", config.TRUST_PROXY);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(helmet({  
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }  
}));

app.use(cors({
  origin: function (origin, callback) {    
    if (!origin) return callback(null, true);
    if (config.CORS_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(Boom.forbidden(`Origen no permitido por CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando. ");
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(notFoundPageHandler);


export default app;
