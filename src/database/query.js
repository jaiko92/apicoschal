const Firebird = require('node-firebird')
const { options } = require('./config')
const ejecutarConsulta = (query) => {
    const promise = new Promise((resolve, reject) => {
        Firebird.attach(options, function (err, db) {
            if (err) {
                reject(new Error(err));
            } else {
                // const query = `SELECT ID_SOCIO FROM LECTURA WHERE id_genfact = ${idgenfact}`
                db.query(query, function (err, result) {
                    // console.log(result)
                    resolve(result);
                    db.detach();
                });
            }

        });
    });
    return promise;
}

const ejecutarConsultaParams = (query, params) => {
    const promise = new Promise((resolve, reject) => {
        Firebird.attach(options, function (err, db) {
            if (err) {
                reject(new Error(err));
            } else {
                // const query = `SELECT ID_SOCIO FROM LECTURA WHERE id_genfact = ${idgenfact}`
                db.query(query,params ,function (err, result) {
                    // console.log(result)
                    resolve(result);
                    db.detach();
                });
            }

        });
    });
    return promise;
}

module.exports = {
    ejecutarConsulta,
    ejecutarConsultaParams
}