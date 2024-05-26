const express = require('express');
const app = express();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require('./controllers/productController');

const {
  getForecastData
} = require('./controllers/forecastController');
const Product = require("./models/productModel");

const PORT = process.env.PORT || 5005;
app.use(express.json());

function validateProductFields(req, res, next) {
  const requiredFields = ['id', 'name', 'description', 'price'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Missing required fields',
      missingFields: missingFields
    });
  }
  next();
}

app.get('/api/products', async (req, res) => getProducts(req, res));

app.get('/api/products/:id', (req, res) => getProduct(req, res, req.params.id));

app.post('/api/products', async (req, res) => getProducts(req, res));

app.put('/api/products/:id', validateProductFields, async (req, res) => updateProduct(req, res, req.params.id, req.body));

app.patch('/api/products/:id', (req, res) => patchProduct(req, res, req.params.id, req.body));

app.delete('/api/products/:id', (req, res) => deleteProduct(req, res, req.params.id));

app.get('/api/forecast/:location', (req, res) => getForecastData(req, res));

app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found: Please use the api/products endpoint',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
