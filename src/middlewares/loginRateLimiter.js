import Boom from "@hapi/boom";
import config from "../config/env.config.js";

/**
 * Limita los intentos FALLIDOS de login por IP + correo (en memoria).
 * Se cuenta por correo además de IP para no bloquear a todo un colegio
 * que comparte la misma IP pública.
 */
const intentos = new Map(); // clave -> { count, inicio }
const ventanaMs = () => config.LOGIN.WINDOW_MINUTES * 60 * 1000;

setInterval(() => {
  const ahora = Date.now();
  for (const [clave, e] of intentos) {
    if (ahora - e.inicio > ventanaMs()) intentos.delete(clave);
  }
}, 60 * 1000).unref();

export const loginRateLimiter = (req, res, next) => {
  const correo = String(req.body?.correo || "").trim().toLowerCase();
  const clave = `${req.ip}|${correo}`;
  const ahora = Date.now();

  const entrada = intentos.get(clave);
  if (entrada && ahora - entrada.inicio > ventanaMs()) intentos.delete(clave);

  const actual = intentos.get(clave);
  if (actual && actual.count >= config.LOGIN.MAX_ATTEMPTS) {
    const segundos = Math.ceil((actual.inicio + ventanaMs() - ahora) / 1000);
    res.set("Retry-After", String(segundos));
    return next(
      Boom.tooManyRequests(
        `Demasiados intentos fallidos. Intenta nuevamente en ${Math.ceil(segundos / 60)} minuto(s).`,
      ),
    );
  }

  res.on("finish", () => {
    if (res.statusCode === 401) {
      const e = intentos.get(clave);
      if (e) e.count += 1;
      else intentos.set(clave, { count: 1, inicio: ahora });
    } else if (res.statusCode < 400) {
      intentos.delete(clave);
    }
  });

  next();
};
