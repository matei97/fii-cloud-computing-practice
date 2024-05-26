const Product = require('../models/productModel')

const { getPostData } = require('../utils')

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res) {
    try {
        const { price } = req.query;
        let products = await Product.findAll()
        if (price != undefined) {
            products = products.filter(p => p.price == price)
        }
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: error}))
    }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
    }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res, body = undefined) {
    try {
        if (body == undefined) {
            body = await getPostData(req);
            body = JSON.parse(body);
        }

        const { name, description, price } = body;

        const product = {
            name,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))  

    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id, body = undefined) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            if (body == undefined) {
                body = await getPostData(req);
                body = JSON.parse(body);
            }

            const { name, description, price } = body

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct)) 
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
    }
}

// @desc    Patch a Product
// @route   PATCH /api/products/:id
async function patchProduct(req, res, id, body = undefined) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            if (body == undefined) {
                body = await getPostData(req);
                body = JSON.parse(body);
            }

            const { name, description, price } = body

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct))
        }


    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: error }))
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}