const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/observacion', async (req, res) => {
    try {
        const query = `SELECT Id,Nombre,Accion,Frecuencia,TipoCon FROM Observacion WHERE Id >0 ORDER BY Id`
        const observaciones = await ejecutarConsulta(query)
        res.json({
            observaciones
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