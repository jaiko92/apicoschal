const router = require('express').Router();
const { ejecutarConsultaParams } = require('../database/query')

router.post('/lectura', async (req, res) => {
    try {
        const body = req.body
        const { id_genfact, id_socio, lect_act, fec_lectact, hor_lectact, id_observacion, consumo, consumo_fac, detallelec, latitud, longitud } = body

       // console.log('udpate', id_genfact, id_socio,);

        // TODO: Guardar en  base de datos
        const query = 'UPDATE Lectura SET Lect_Act=?, Fec_LectAct=? ,Hor_LectAct=?,Observacion=? ,Consumo=?, Cons_Real=?,Detallelec=?,Latitud=?,Longitud=?,Estado=1 WHERE id_genfact=? AND id_socio=?';
        const params = [lect_act, fec_lectact, hor_lectact, id_observacion, consumo, consumo_fac, detallelec,latitud ,longitud ,id_genfact, id_socio];
        const updateLectura = await ejecutarConsultaParams(query, params);
        res.json({
            status: "ok",
            data: {
                message: "Lectura Actualizada"
            }
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