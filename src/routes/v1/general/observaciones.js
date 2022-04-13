const express = require('express');
const Firebird = require('node-firebird')
const { options } = require('../../../database/config')
const app = express();

app.get('/datasnap/rest/TServerLectMobil/Observaciones', function (req, res) {
    //const id = req.params.IdTecnico
    //res.json({ID:1000,Name:"Prueba Lectmobil",Idtec:id})

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE
        // query=`SELECT Id,Nombre,Accion,Frecuencia FROM Observacion WHERE Id >0 ORDER BY Id`
        query=`SELECT Id,Nombre,Accion,Frecuencia,TipoCon FROM Observacion WHERE Id >0 ORDER BY Id`
        db.query(query, function (err, result) {
            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
            res.json({Detalle:result})
        });

    });
})

module.exports = app;