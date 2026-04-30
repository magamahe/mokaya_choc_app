const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        process.exit(1); // Detiene la app si no hay conexión
    }
};

module.exports = connectDB;