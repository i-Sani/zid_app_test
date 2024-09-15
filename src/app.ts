import express from "express";
import routes from './routes';
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";

const app = express();

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add this route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Zid Express Sample App!');
});

app.use('/', routes);

export default app;