const express = require('express');
const Firebird = require('node-firebird')
const { options } = require('../../database/config')
const app = express();


app.get('/datasnap/rest/TServerLectMobil/Categorias', function (req, res) {

    Firebird.attach(options, function (err, db) {

        if (err)
            throw err;
        // const queryRango = `SELECT R.Id_Categ,R,Inicio,R.Fin,R.Mto_Cubo,R.Mto_Alca FROM RandoCat R,Categoria C WHERE R.Id_Categ = C.Id_Categ  ORDER BY R.Id_Categ,R.Inicio`
        const queryCategoria = `SELECT Id_Categ,Nomb_Categ,Moneda,MonedaAs,PrecioCM,PrecioSM,PrecioCMAL,PrecioSMAL,ConsumoMin FROM Categoria ORDER BY Id_Categ`
        db.query(queryCategoria, function (err, result) {

            treaerRango().then(resp => {
                const categorias = result.map((item) => {
                    return {
                        ...item,
                         RANGOS: resp.filter( rango => item.ID_CATEG == rango.ID_CATEG )
                    }
                })
                db.detach();
                res.json({
                    categorias
                })
            })


        });

    });


})

function treaerRango() {
    const promise_rango = new Promise((resolve, reject) => {
        Firebird.attach(options, function (err, db) {
            if (err)
                throw err;
            const query = `SELECT Id_Categ,Inicio,Fin,Mto_cubo,Mto_Alca FROM RangoCat ORDER BY Inicio`
            db.query(query, function (err, result) {
                console.log(result)
                resolve(result)
                db.detach();
            });
    
        });
    });
    return  promise_rango;
}


module.exports = app;