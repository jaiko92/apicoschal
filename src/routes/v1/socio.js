const express = require('express');
const Firebird = require('node-firebird')
const { options } = require('../../database/config')
const { ejecutarConsulta } = require('../../database/query')
const app = express();

app.get('/datasnap/rest/TServerLectMobil/socios/:IdGenfact', function (req, res) {
    const id = req.params.IdGenfact
    //res.json({ID:1000,Name:"Prueba Lectmobil",Idtec:id})

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE

        const query = `SELECT a.ID_SOCIO, a.ID_GENFACT, a.COD_SOCIO, a.NOMBRE, a.DIRECCION, a.LEY1886, a.LEY1886M3, a.LEY1886POR, a.UV, a.LOTE, a.MZA, a.LECT_ANT, a.FEC_LECTANT, a.CONS_ANT, a.CATEGORIA,c.NOMB_CATEG, a.CORTE,a.MESCORTE, a.ALCANTA, a.MEDIA, a.CONSUMOSOC, a.SNMEDIDOR, a.MEDIDOR,a.MESCORTE, a.DIASCORTE, a.PLAZO_FAC, a.ANUNCIO, a.IPC FROM LECTURA a, CATEGORIA c WHERE a.CATEGORIA = c.ID_CATEG AND a.Id_Genfact=${id}`
        console.log('query sql', query)
        db.query(query, function (err, result) {
            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
            res.json({
                // Cantidad: result.length,
                Lectura: result
            })
        });

    });


})
// datasnap/rest/TServerLectMobil/Detallesoc/24885/10625
app.get('/datasnap/rest/TServerLectMobil/Detallesoc/:IdGenfact/:IdSocio', function (req, res) {
    const id = req.params.IdGenfact
    const idSocio = req.params.IdSocio
    //res.json({ID:1000,Name:"Prueba Lectmobil",Idtec:id})

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE

        const query = `SELECT d.Gestion,d.Mes,d.Id_Genfact,d.Id_Socio,d.Id_Serv,d.NombreCorto AS Nombre,d.Monto,d.Estado FROM DETALLE d WHERE d.Id_Genfact=${id} and d.Id_Socio=${idSocio}`
        console.log('query sql', query)
        db.query(query, function (err, result) {
            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
            res.json({
                // Cantidad: result.length,
                Detalle: result
            })
        });

    });


})

app.get('/datasnap/rest/TServerLectMobil/HistoricoSoc/:Idgenfact/:IdSocio', function (req, res) {
    const idgenfact = req.params.Idgenfact
    const idSocio = req.params.IdSocio

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE

        const query = `SELECT Id_Genfact,Id_Socio,Id_Factura,Cobro,Id_Mediest,ConsumoFac,Consumo,Mto_Total,Es_Factura,FacPago,NFactura FROM Historico  WHERE Id_genfact=${idgenfact} AND Id_Socio=${idSocio}`
        console.log('query sql', query)
        db.query(query, function (err, result) {
            console.log(result)
            // IMPORTANT: close the connection
            db.detach();
            res.json({
                // Cantidad: result.length,
                Historico: result
            })
        });

    });


})


app.get('/datasnap/rest/TServerLectMobil/DatosSocio/:Idgenfact/:IdSocio', async function (req, res) {

    try {
        const idgenfact = req.params.Idgenfact
        const idSocio = req.params.IdSocio
    
        const querySocios = `SELECT a.ID_SOCIO, a.ID_GENFACT, a.COD_SOCIO, a.NOMBRE, a.DIRECCION, a.LEY1886, a.LEY1886M3, a.LEY1886POR, a.UV, a.LOTE, a.MZA, a.LECT_ANT, a.FEC_LECTANT, a.CONS_ANT, a.CATEGORIA,c.NOMB_CATEG, a.CORTE, a.MESCORTE , a.ALCANTA, a.MEDIA, a.CONSUMOSOC, a.SNMEDIDOR, a.MEDIDOR, a.DIASCORTE, a.PLAZO_FAC, a.ANUNCIO, a.IPC FROM LECTURA a, CATEGORIA c WHERE a.CATEGORIA = c.ID_CATEG AND a.ID_SOCIO=${idSocio} AND a.ID_GENFACT=${idgenfact}`
        const queryDetalle = `SELECT d.Gestion,d.Mes,d.Id_Genfact,d.Id_Socio,d.Id_Serv,d.NombreCorto As Nombre,d.Monto,d.Estado FROM DETALLE d WHERE d.Id_Genfact=${idgenfact} and d.Id_Socio=${idSocio}`
        const queryHistorico = `SELECT Id_Genfact,Id_Socio,Id_Factura,Cobro,Id_Mediest,ConsumoFac,Consumo,Mto_Total,Es_Factura,FacPago,NFactura FROM Historico  WHERE Id_genfact=${idgenfact} AND Id_Socio=${idSocio}`
    
        const socio = await ejecutarConsulta(querySocios)
        const detalle = await ejecutarConsulta(queryDetalle)
        const historico = await ejecutarConsulta(queryHistorico)
    
        res.json({
            // Cantidad: result.length,
            socio,
            detalle,
            historico
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error'
        })
    }

})


module.exports = app;