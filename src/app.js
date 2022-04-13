const express = require('express')
const helmet = require("helmet");
const compression = require("compression");
const cors = require('cors')
require('express-async-errors');
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// CORS
app.use( cors({ origin: true, credentials: true  }) );

app
.use(helmet())
.use(compression());


app.get('/', function (req, res) {
  res.send('Servicio Online!')
})



// Rutas api
// app.use(require('./routes/v1/zona'))
// app.use(require('./routes/v1/catecons'))
// app.use(require('./routes/v1/socio'))
// app.use(require('./routes/v1/lectura'))
// app.use(require('./routes/v1/categoria'))
// app.use(require('./routes/v1/general/observaciones'))

app.use(require('./routes'));




// Configuracion de puertos
app.set('port', process.env.PORT || 8090);

const port = app.get('port');
// const ipWifi =    '192.168.31.41';
// const ipLocal = '192.168.1.11';
// app.listen(port, ipLocal,() => {
//     console.log(`Api online puerto: ${port}`);
// })

app.listen(port,() => {
  console.log(`Api online puerto: ${port}`);
})
