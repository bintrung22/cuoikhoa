const mongoose = require('mongoose');
require('dotenv').config({ path: 'local.env' });

const connectDatabase = async () => {
  try {
    const dbConfig = process.env.NAME_DATABASE;
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb connected: ${connect.connection.host}`);
  } catch (e) {
    console.log('Error connect to mongodb');
  }
}

module.exports = connectDatabase;