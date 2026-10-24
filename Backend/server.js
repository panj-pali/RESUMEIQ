
require('dotenv').config();

const connectDB = require('./src/config/database');
const app = require('./src/app');

const PORT = process.env.PORT || 3100;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
