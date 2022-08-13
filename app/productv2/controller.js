const Product = require('./model');
const { Op } = require("sequelize");
const path = require('path'); 
const fs = require('fs');


const create = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`});
            res.status(200).send({
                message: `Product successfully Created`,
                data: result,
            });
        } catch (error) {
            res.send(error);
        }
    }
}


const findAll = async (req,res) => {
    const {q} = req.query;
    let query = {} 
    try {
        await Product.sync();
        q && (
                query = {
                    where: { 
                    name: {
                        [Op.like]: `%${q}%`
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        )
        !q && (
                query = {
                    attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        )
        const result = await Product.findAll(query);
        res.status(200).send({
            message: `Success`,
            data: result
        })
    } catch (error) {
    res.send(error);
    }
}

const findById = async (req,res) => {
    const {id} = req.params;
    try {
        await Product.sync();
        const result = await Product.findOne({
            where: {
            id
            },
            attributes: {
            exclude: ['createdAt', 'updatedAt']
            }
            });
        if (result === null){
                res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else {
                res.status(200).send({
                message: `Success`,
                data: result

            })
        }
    } catch (error) {
         res.send(error);
    }
}
const update = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body; 
    const {id} = req.params;
    const image = req.file;
    let body = {};

  
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        body = {
            users_id,
            name,
            price,
            stock,
            status,
            image: `http://localhost:3000/public/${image.originalname}`
        }
    } 
    else {
        body = {
            users_id,
            name,
            price,
            stock,
            status,
        }
    }
    try {
        await Product.sync();
        const updateData = await Product.update(body, {
            where: { id },
        });
        if(updateData === null) {
            res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else {
            const result = await Product.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            })
            res.status(200).send({
            message: `Data with id ${id} successfully updated`,
            data: result
            })
        }
    } catch (error) {
        res.send(error);
    }
}
const destroy = async (req,res) => {
    const {id} = req.params;
    try {
        await Product.sync();
        const existId = await Product.findOne({
            where: { id }
        })
        if(existId === null){
            res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else { 
            await Product.destroy({
                where: {
                    id
                },
            });
            res.status(200).send({
                message: `Product with id ${id} succesfully deleted`
            })
        }
    } catch (error) {

        res.send(error);
    }
}


module.exports = {
    create,
    findAll,
    findById,
    update,
    destroy
};