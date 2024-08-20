const express = require ('express');
const morgan = require ('morgan');
const app = express();
var cors = require('cors');
const registerInformation = require('./routes/userRoutes');
const setupSwagger = require('./swagger/swagger');

app.set('port', 4002);

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

setupSwagger(app);

app.use('/apiregister',registerInformation);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

