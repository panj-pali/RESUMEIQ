const mongoose = require('mongoose');

let connectionPromise;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required to connect to MongoDB');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        connectionPromise = undefined;
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  }

  await connectionPromise;
}

module.exports = connectDB;