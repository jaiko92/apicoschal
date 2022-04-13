const router = require('express').Router();
const { ejecutarConsulta } = require('../database/query')

router.get('/catecons', async (req, res) => {
    try {
        const query = `SELECT ID_CATEG,INICIO,FIN,VARIACION FROM CATECONS`
        const catecons = await ejecutarConsulta(query)
        res.json({
            catecons
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