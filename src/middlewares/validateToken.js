import UtilServices from './../services/util.service.js';
import Boom from '@hapi/boom';

const utilServices = new UtilServices();

 const validateTokenDb = async (req, res, next) => {
    const auth = req.headers['authorization'];

    if (!auth || !auth.startsWith('Bearer ')) {
        return next(Boom.unauthorized('Formato de autorización inválido'));
    }

  const token = auth.split(' ')[1];

  try {
 
    const decoded = jwt.verify(token, config.TOKEN.JWT);     
    const { auth_token, usuario } = decoded;
    const response = await utilServices.validateToken(usuario, auth_token);

    if (!response) {
      return next(Boom.forbidden('Token revocado o no válido en el sistema'));
    }
    
    next();

  } catch (err) {    
     if (err.name === 'TokenExpiredError') {
      return next(Boom.unauthorized('Token expirado'));
    }
    return next(Boom.forbidden('Token inválido'));
  }
};

export default validateTokenDb;