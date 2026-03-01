import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { connectDB } from "./libs/mongoose.js";
import { notFoundPageHandler, logErrors, errorHandler, boomErrorHandler, ormErrorHandler } from'./middlewares/errorHandler.js';
import helmet from "helmet";
const app = express();


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
    const allowedOrigins = ["https://devocionalfrontend.onrender.com"];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectDB();
  
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando. ");
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(notFoundPageHandler)


export default app;
