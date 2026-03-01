import Boom from '@hapi/boom';
import models from "../models/index.js";
class UtilService {   
    async validateToken(usuario, token) {
        try {
            const data = await models.SessionsModel.findOne({
                where: {
                    usuario: usuario,
                    token: token
                },
                raw: true
            });
            return data;
        } catch (error) {
            if (Boom.isBoom(error)) throw error;
            throw Boom.internal(error);
        }
    }
}

export default UtilService;