import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Starting ExpressJS server on Port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Base URL: ${process.env.BASE_URL || `http://localhost:${port}`}`);
});

export default server;  // Export the server instance
