const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/socio/:idSocio/genfact/:idGenFact', async (req, res) => {
    try {
        const {idGenFact, idSocio} = req.params
        const querySocios = `SELECT a.ID_SOCIO, a.ID_GENFACT, a.COD_SOCIO, a.NOMBRE, a.DIRECCION, a.LEY1886, a.LEY1886M3, a.LEY1886POR, a.UV, a.LOTE, a.MZA, a.LECT_ANT, a.FEC_LECTANT, a.CONS_ANT, a.CATEGORIA,c.NOMB_CATEG, a.CORTE, a.MESCORTE , a.ALCANTA, a.MEDIA, a.CONSUMOSOC, a.SNMEDIDOR, a.MEDIDOR, a.DIASCORTE, a.PLAZO_FAC, a.ANUNCIO, a.IPC FROM LECTURA a, CATEGORIA c WHERE a.CATEGORIA = c.ID_CATEG AND a.ID_SOCIO=${idSocio} AND a.ID_GENFACT=${idGenFact}`
        const queryDetalle = `SELECT d.Gestion,d.Mes,d.Id_Genfact,d.Id_Socio,d.Id_Serv,d.NombreCorto As Nombre,d.Monto,d.Estado FROM DETALLE d WHERE d.Excento = 0 and d.Id_Genfact=${idGenFact} and d.Id_Socio=${idSocio}`
        const queryHistorico = `SELECT Id_Genfact,Id_Socio,Id_Factura,Cobro,Id_Mediest,ConsumoFac,Consumo,Mto_Total,Es_Factura,FacPago,NFactura FROM Historico  WHERE Id_genfact=${idGenFact} AND Id_Socio=${idSocio}`
    
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
        res.status(404).send({
            status: 'error',
            message: error.message,
        });
    }

});

module.exports = router;