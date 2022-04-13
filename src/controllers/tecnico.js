const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/tecnico/:idTecnico/zona', async (req, res) => {
    try {
        const { idTecnico } = req.params
        const queryZonas = `SELECT Z.Id_Tecnico,Z.ID_GENFACT,Z.GESTION, Z.MES,  Z.ZONA, Z.RUTA, Z.ESTADO, Z.CANTIDAD
        FROM ZONALECTURA Z, Parametro P
        WHERE Z.GESTION = P.GESTION AND Z.MES=P.MES
        AND Z.ESTADO = 1 AND Z.ID_TECNICO = ${idTecnico} ORDER BY Z.ZONA, Z.RUTA`
        const zonas = await ejecutarConsulta(queryZonas)
        // const zonas  = await  traerZonas(id)
        for (const zona of zonas) {
            const querySocios = `SELECT ID_SOCIO FROM LECTURA WHERE id_genfact = ${zona.ID_GENFACT}`
            const socios = await ejecutarConsulta(querySocios)
            // zona.TOTAL = socios.length
            const lista = socios.map(item => item.ID_SOCIO);
            zona.SOCIOS = lista;
            zona.CANTIDAD = lista.length
            // zona = {...zona, key3:'abc'}
        };
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