const express = require('express');
const router = express.Router();

const tokenCheck = require('../middlewerase/tokenCheck');

const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const Product = require('../models/Product');
const Category = require('../models/Cotegory');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploads)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if(req.query.category){
        const newProduct = await Product.find({category: req.query.category});

        return  res.send(newProduct);
    }

    const newProduct = await Product.find();

    res.send(newProduct);
});

router.get('/categories', async (req, res) => {
    const categories = await Category.find();

    res.send(categories);
});

router.get('/:id', tokenCheck, async (req, res) => {
    const newProduct = await Product.findOne({_id: req.params.id}).populate(['author', 'category']);

    res.send(newProduct);
});

const addMiddleware = [tokenCheck, upload.single('image')];

router.post('/', addMiddleware, async (req, res) => {
    if(req.file){
        req.body.image = req.file.filename;
    }

    req.body.author = req.user._id;

    const newProduct = await Product.create(req.body);

    res.send(newProduct);
});

router.delete('/:id', tokenCheck, async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate('author');

    if(product.author.token === req.user.token) {
        product.remove();
        return  res.send({message: 'Deleted'});
    } else {
        return  res.status(404).send({message: 'Its not your product!'});
    }
});

module.exports = router;