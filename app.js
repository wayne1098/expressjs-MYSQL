const express= require('express');
const path= require('path');
const app = express();
const productRouter = require('./app/product/routes');
const productRouterV2 = require('./app/productv2/routes');
const logger = require ('morgan');
const port = process.env.PORT || 8080;




app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    })
})

app.listen(port, () => console.log(`Server: http://localhost:${port}`));