const app = require("./src/app");
// const redisClient = require('./src/utils/redis');
require("dotenv").config();

const PORT = process.env.PORT || 5050;

// Start server
const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Test Redis connection
  //   try {
  //     await redisClient.ping();
  //     console.log('Connected to Redis');
  //   } catch (err) {
  //     console.error('Redis connection error:', err);
  //   }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
