require('dotenv').config();
const connectDB = require('./src/config/database');

// Connect to the database
connectDB();

const app=require('./src/app');
app.listen(3100, () => {
  console.log('Server is running on port 3100');
}); 