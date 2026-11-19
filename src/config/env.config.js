import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const NODE_ENV = process.env.NODE_ENV || "development";

// Acepta TOKEN_JWT (nombre actual) o JWT_SECRET (nombre usado antes en el código)
const JWT_SECRET = process.env.TOKEN_JWT || process.env.JWT_SECRET;

const required = { MONGO_URI: process.env.MONGO_URI, TOKEN_JWT: JWT_SECRET };
const missing = Object.entries(required)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length) {
  throw new Error(
    `Faltan variables de entorno obligatorias: ${missing.join(", ")}. Revisa el archivo .env (ver .env.example).`,
  );
}

const splitList = (value) =>
  (value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

export default {
  NODE_ENV,
  IS_PRODUCTION: NODE_ENV === "production",
  PORT: Number(process.env.PORT) || 1233,
  HOST: process.env.HOST || undefined,
  MONGO_URI: process.env.MONGO_URI,
  TOKEN: {
    JWT: JWT_SECRET,
    EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || "24h",
  },
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
  CORS_ORIGINS: splitList(process.env.CORS_ORIGINS),
  // Nombres de tipo de usuario (tipoUsuario.descripcion) con permisos de administrador
  ADMIN_ROLES: splitList(process.env.ADMIN_ROLES || "adminitrador"),
  // Número de proxies delante de la app (Render, Nginx, cPanel...). Vacío = no confiar en X-Forwarded-For
  TRUST_PROXY: process.env.TRUST_PROXY ? Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY : false,
  LOGIN: {
    MAX_ATTEMPTS: Number(process.env.LOGIN_MAX_ATTEMPTS) || 5,
    WINDOW_MINUTES: Number(process.env.LOGIN_WINDOW_MINUTES) || 15,
  },
  SSL: {
    PATH_PRIVATEKEY: process.env.SSL_PATH_PRIVATEKEY,
    PATH_CERTIFICATE: process.env.SSL_PATH_CERTIFICATE,
    PATH_BUNDLE: process.env.SSL_PATH_BUNDLE,
  },
};
