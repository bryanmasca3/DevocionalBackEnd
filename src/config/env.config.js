import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export default {
  PORT: process.env.PORT || 1233,
  MONGO_URI: process.env.MONGO_URI, 
  TOKEN: {
    JWT: process.env.TOKEN_JWT,
  },
  SSL: {
    PATH_PRIVATEKEY: process.env.SSL_PATH_PRIVATEKEY,
    PATH_CERTIFICATE: process.env.SSL_PATH_CERTIFICATE,
    PATH_BUNDLE: process.env.SSL_PATH_BUNDLE,
  }, 
};
