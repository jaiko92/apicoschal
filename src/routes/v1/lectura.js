const express = require('express');
const Firebird = require('node-firebird')
const { options } = require('../../database/config')
const app = express();

app.post('/datasnap/rest/TServerLectMobil/AcceptLectura', function (req, res) {
    const body = req.body
    const { id_genfact, id_socio, lect_act, fec_lectact, hor_lectact, id_observacion, consumo, consumo_fac,detallec, detallelec } = body

    // TODO: Guardar en  base de datos

     const detalle = body.hasOwnProperty('detallec') ? detallec:  detallelec;

    Firebird.attach(options, function(err, db) {
 
        if (err)
            throw err;
     
        // db = DATABASE
        // UPDATE Lectura SET Lect_Act=x,Fec_LectAct='',Observacion=x,Estado=2 WHERE id_genfact=x AND id_socio=x
        db.query('UPDATE Lectura SET Lect_Act=?, Fec_LectAct=? ,Hor_LectAct=?,Observacion=? ,Consumo=?, Cons_Real=?,Detallelec=?,Estado=1 WHERE id_genfact=? AND id_socio=?', 
                    [lect_act, fec_lectact,hor_lectact,id_observacion,consumo, consumo_fac,detalle,id_genfact, id_socio], function(err, result) {
                     //console.log(result);
          
                     db.detach();
                     res.json({ 
                        status: "ok",
                        data: {
                            message: "lectura actualizada"
                        }
                     })
        });
    });

})

module.exports = app