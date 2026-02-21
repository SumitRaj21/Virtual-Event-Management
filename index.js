const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db.config');
dotenv.config();

const PORT = process.env.PORT || 4040;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();