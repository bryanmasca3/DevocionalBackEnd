import fs from "fs";
import https from "https";
import http from "http";
import config from "./config/env.config.js"; 
import app from "./app.js";

const SERVER_PORT = config.PORT;
/* 
const privateKey = fs.readFileSync(config.SSL.PATH_PRIVATEKEY);
const certificate = fs.readFileSync(config.SSL.PATH_CERTIFICATE);
const bundle = fs.readFileSync(config.SSL.PATH_BUNDLE);
const credentials = { key: privateKey, cert: certificate, ca: [bundle] };
 */

//const server = http.createServer(credentials, app);
const server = http.createServer(app);

server.listen(SERVER_PORT, config.DOMAIN, () => {
    console.log(
      `Servidor en el puerto ${SERVER_PORT}`
    );
  });