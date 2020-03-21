const Product = require('./models/Product');
const Category = require('./models/Cotegory');
const User = require('./models/User');

const mongoose = require('mongoose');
const config = require("./config");

const init = async () => {
    await mongoose.connect(config.baseUrl,config.baseConfig);

    const [Ramazan, Kadir] = await User.create(
        {
            "username" : "Ramazan",
            "password" : "12345",
            "displayName" : "Ramazan",
            "phone" : "11122001",
            "token" : "ymOkodEZFJT7qQ5CbpHCm",
            "__v" : 0
        },
        {
            "username" : "Kadir",
            "password" : "12345",
            "displayName" : "Kadir",
            "phone" : "11122001",
            "token" : "4gMB64CBfEarWXvdnS8S-",
            "__v" : 0
        }
    );

    const [Category1, Category2, Category3] = await Category.create(
        { "name" : "Category 1" },
        { "name" : "Category 2" },
        { "name" : "Category 3" }
    );

    await Product.create(
        {
            "title" : "Some product 1",
            "description" : "Some product 1 Some product",
            "category" : Category1,
            "price" : "2000",
            "image" : "31VGMzJPXbsxE1wdzxIVO.jpg",
            "author" : Ramazan,
            "__v" : 0
        },
        {
            "title" : "Some product 2",
            "description" : "Some product 2 Some product",
            "category" : Category1,
            "price" : "1200",
            "image" : "zf2pZADOSOp0llUoPdJVV.jpg",
            "author" : Ramazan,
            "__v" : 0
        },
        {
            "title" : "Some product 3 Some product ",
            "description" : "Some product 3 Some product",
            "category" : Category2,
            "price" : "3000",
            "image" : "nS4_Y5Z25fOQEMuBmKmnc.jpeg",
            "author" : Ramazan,
            "__v" : 0
        },
        {
            "title" : "Some product 4",
            "description" : "Some product 4 Some product",
            "category" : Category3,
            "price" : "2240",
            "image" : "_T7IJHBO2IUgJlrFKWrgT.jpg",
            "author" : Kadir,
            "__v" : 0
        }
    );






};

init().catch(e => {
    throw e
});