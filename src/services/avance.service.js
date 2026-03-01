import { DevocionalModel } from "./../models/devocional.model.js";
import { DevocionalUsuarioModel } from "./../models/devocionalUsuario.model.js";
class AvanceService {

  async getDevocionalAnual(usuarioId) {
    const now = new Date();
    const inicioAnio = new Date(now.getFullYear(), 0, 1);
    const finAnio = new Date(now.getFullYear() + 1, 0, 1);

    const devocionales = await DevocionalModel.find({
      fecha_publicacion: {
        $gte: inicioAnio,
        $lt: finAnio,
      },
    });

    const ids = devocionales.map((d) => d._id);

    const estados = await DevocionalUsuarioModel.find({
      id_devocional: { $in: ids },
      id_usuario: usuarioId,
    });

    const estadoMap = {};
    estados.forEach((e) => {
      estadoMap[e.id_devocional.toString()] = e;
    });

    return devocionales.map((dev) => ({
      ...dev.toObject(),
      success: estadoMap[dev._id.toString()]?.success ?? false,
    }));
  }
  
}
export default AvanceService;
