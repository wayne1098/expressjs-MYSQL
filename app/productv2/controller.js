const Product = require('./model'); 
const { Op } = require("sequelize");  
const path = require('path'); 
const fs = require('fs');
const port = process.env.PORT || 8080;




const create = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body; 
    const image = req.file; 
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`});
            res.status(200).send({
                message: `Product successfully Created`,
                data: result,
            });
        } catch (error) {
            res.send(error);
        }
    }
}

const show = async (req, res) => {
    const product = await Product.findAll();
    try {
        res.json({
        status: "Get data Success",
        data: product,
        });
      } catch (error) {
        res.json({ message: error.message })
        console.log(error);
      }
};

const showId = async (req, res) => {
    const product = await Product.findAll({
        where: {
            id: req.params.id
        }
    });
    try {
        res.json({
        status: "Get data Success",
        data: product[0],
        });
      } catch (error) {
        res.json({ message: error.message })
        console.log(error);
      }
};

const update = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    const id = req.params.id;
    let find = await Product.findByPk(id);
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            const result  = await find.update({users_id, name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`});
            res.send(result);
        }catch (error) {
            res.json({ message: error.message })
            console.log(error);
        }
    }
};

const del = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    const id = req.params.id;
    let find = await Product.findByPk(id);
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            const result  = await find.destroy({users_id, name, price, stock, status, image_url: `http://localhost:${port}/public/${image.originalname}`});
            res.json({
                "message" : "Deleted data succes",
            })
        }catch (error) {
            res.json({ message: error.message })
            console.log(error);
        }
    }
};

module.exports = {
    create, 
    show, 
    showId, 
    update, 
    del
}