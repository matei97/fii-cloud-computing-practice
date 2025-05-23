const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const {
  getForecastData
} = require('./controllers/forecastController');



const server = http.createServer((req, res) => {
  if (req.  url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id);
  }
  else if (req.url.match(/\/api\/forecast\/\w+/) && req.method === 'GET') {
    getForecastData(req,res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/products endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
