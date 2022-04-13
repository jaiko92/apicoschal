const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/categoria', async (req, res) => {
    try {
   
        const queryCategoria = `SELECT Id_Categ,Nomb_Categ,Moneda,MonedaAs,PrecioCM,PrecioSM,PrecioCMAL,PrecioSMAL,ConsumoMin FROM Categoria ORDER BY Id_Categ`
        const queryRangos = `SELECT Id_Categ,Inicio,Fin,Mto_cubo,Mto_Alca FROM RangoCat ORDER BY Inicio`
        const rangos =  await ejecutarConsulta(queryRangos);
        const categorias = await ejecutarConsulta(queryCategoria);
        // const zonas  = await  traerZonas(id)
        const categoria_rango = categorias.map((item) => {
            return {
                ...item,
                 RANGOS: rangos.filter( rango => item.ID_CATEG == rango.ID_CATEG )
            }
        })
        res.json({
            categorias: categoria_rango
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