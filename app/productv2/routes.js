const router = require('express').Router();
const Product = require('./model');
const multer = require('multer');
const path = require ('path');
const fs = require ('fs');
const upload = multer({dest: 'uploads'});
const { create, findAll, findById, update, destroy } = require('./controller');



router.post('/product', upload.single('image'), create);
router.get('/product', findAll);
router.get('/product/:id', findById);
router.put('/product/:id', upload.single('image'), update);
router.delete('/product/:id', destroy);

// router.post('/product' , upload.single('image'), async (req, res) =>{
//     const {users_id, name, price, stock, status} = req.body;
//     const image = req.files;
//     if(image){
//         const target = path.join(__dirname, '../../uploads', image.originalname);
//         fs.renameSync(image.path, target);
//     try {
//         await Product.sync();
//         const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`});
//         res.send(result);
//     }catch(e) {
//         res.send(e);
//     }
//     }
//     });

module.exports  = router;