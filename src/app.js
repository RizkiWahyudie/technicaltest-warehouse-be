const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const verifyToken = require('./middlewares/auth');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', verifyToken, require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('Warehouse Management API is running');
});

module.exports = app;