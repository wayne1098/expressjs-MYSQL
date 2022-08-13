const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
// const fs = require('fs');
// const { send } = require('process');
// const path= require('path');
// const connection = require('../config/mysql');
const productController = require ('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product/', upload.single('image'), productController.store);
router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', upload.single('image'), productController.destroy);

// router.get('/',(req,res) => {
//   res.sendFile(path.join(__dirname+'/public/index.html'));
// });

// router.get('/about',(req,res) => {
//   res.sendFile(path.join(__dirname+'/public/about.html'));
// });

// router.get('/contact',(req,res) =>{
//   res.sendFile(path.join(__dirname+'/public/contact.html'));
// });



// router.get('/product',(req,res) => {
//   connection.connect();
//   connection.query({
//     sql: 'SELECT * FROM products',
//   }, (error, result) => {
//     if(error){
//       res.send({
//         status: 'failed',
//         response: 'failed to fetch data'
//       });
//     }else {
//       res.send({
//         status: 'succes',
//         response: result
//       });
//     }
//   });
//   connection.end();    
// });

// router.get('/product/:id', (req ,res) => {
//     res.json({
//         id: req.params.id
//     });
// });


// router.get('/product/', upload.single('image'), (req ,res) => {
//     const {name, price, stock, status} = req.body;
//     const image = req.file;
//     if(image){
//         const target = path.join(__dirname, 'uploads', image.originalname);
//         fs.renameSync(image.path, target) 
//         res.json({
//         name,
//         price,
//         stock,
//         status,
//         image
//     });
//     res.sendFile(target);
//     }
// });

// router.get('/product/', upload.single('image'), (req, res) => {
//     const {name, price, stock, status} = req.body;
//     const image = req.file;
//     // if(image){
//     //     const target = path.joiin(__dirname, 'uploads', image.originalname);
//     //     fs.renameSync(image.path, target) 
//         res.json({
//         name,
//         price,
//         stock,
//         status,
//         image
//     });
//     // res.sendFile(target);
//     // }
// });
 
// router.get('/:category/:tag', (req ,res) => {
//     const {category , tag} = req.params;
//     res.json({category, tag})
// })
  



module.exports = router;