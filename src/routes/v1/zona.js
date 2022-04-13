const express = require('express');
const Firebird = require('node-firebird')
const { options } = require('../../database/config')
const app = express();

const { ejecutarConsulta } = require('../../database/query')

app.get('/datasnap/rest/TServerLectMobil/Zonas/:IdTecnico', function (req, res) {
    const id = req.params.IdTecnico
    //res.json({ID:1000,Name:"Prueba Lectmobil",Idtec:id})

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE
        const query = `SELECT Z.Id_Tecnico,Z.ID_GENFACT, Z.ZONA, Z.RUTA, Z.ESTADO, Z.CANTIDAD
        FROM ZONALECTURA Z, Parametro P
        WHERE Z.GESTION = P.GESTION AND Z.MES=P.MES
        AND Z.ESTADO = 1 AND Z.ID_TECNICO = ${id} ORDER BY Z.ZONA, Z.RUTA`

        db.query(query, function (err, result) {
            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
            res.json({
                Detalle:result
            })
        });

    });
})

app.get('/datasnap/rest/TServerLectMobil/ZonasSocios/:IdTecnico',async function (req, res) {
    try {
        const id = req.params.IdTecnico
        const queryZonas = `SELECT Z.Id_Tecnico,Z.ID_GENFACT, Z.ZONA, Z.RUTA, Z.ESTADO, Z.CANTIDAD
        FROM ZONALECTURA Z, Parametro P
        WHERE Z.GESTION = P.GESTION AND Z.MES=P.MES
        AND Z.ESTADO = 1 AND Z.ID_TECNICO = ${id} ORDER BY Z.ZONA, Z.RUTA`
        const zonas = await ejecutarConsulta(queryZonas)
        // const zonas  = await  traerZonas(id)
        for(const zona of zonas){
            const querySocios = `SELECT ID_SOCIO FROM LECTURA WHERE id_genfact = ${zona.ID_GENFACT}`
            const socios = await ejecutarConsulta(querySocios)
            // zona.TOTAL = socios.length
            const lista =  socios.map(item => item.ID_SOCIO);
            zona.SOCIOS = lista;
            zona.CANTIDAD = lista.length
            // zona = {...zona, key3:'abc'}
        };
        res.json({
            Detalle: zonas
        })
        
    } catch (error) {
        console.log(error)
        res.status(404).send({
            status: 'error'
        });
        // res.json({
        //     status: 'error'
        // })
    }


})

// function traerZonas(id) {
//     const promise = new Promise((resolve, reject) => {
//         Firebird.attach(options, function (err, db) {
//             if (err)
//                 throw err;
//                 const query = `SELECT Z.Id_Tecnico,Z.ID_GENFACT, Z.ZONA, Z.RUTA, Z.ESTADO, Z.CANTIDAD
//                 FROM ZONALECTURA Z, Parametro P
//                 WHERE Z.GESTION = P.GESTION AND Z.MES=P.MES
//                 AND Z.ESTADO = 3 AND Z.ID_TECNICO = ${id}`
//             db.query(query, function (err, result) {
//                 console.log(result)
//                 resolve(result)
//                 db.detach();
//             });
    
//         });
//     });
//     return  promise;
// }
// function traerSocios(idgenfact) {
//     const promise = new Promise((resolve, reject) => {
//         Firebird.attach(options, function (err, db) {
//             if (err)
//                 throw err;
//                 const query = `SELECT ID_SOCIO FROM LECTURA WHERE id_genfact = ${idgenfact}`
//             db.query(query, function (err, result) {
//                 // console.log(result)
//                 resolve(result)
//                 db.detach();
//             });
    
//         });
//     });
//     return  promise;
// }
module.exports = app;