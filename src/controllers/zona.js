const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/zona/:idTecnico/tecnico', async (req, res) => {
    try {
        const { idTecnico } = req.params

        const query = `SELECT Z.Id_Tecnico,Z.ID_GENFACT,Z.GESTION, Z.MES, Z.ZONA, Z.RUTA, Z.ESTADO, Z.CANTIDAD
        FROM ZONALECTURA Z, Parametro P
        WHERE Z.GESTION = P.GESTION AND Z.MES=P.MES
        AND Z.ESTADO = 1 AND Z.ID_TECNICO = ${idTecnico} ORDER BY Z.ZONA, Z.RUTA`
        const zonas = await ejecutarConsulta(query)
        res.json({
            zonas
        })

    } catch (error) {
        console.log(error)
        res.status(404).send({
            status: 'error',
            message: error.message,
        });
    }

});

module.exports = router;