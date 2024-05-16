import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connect from './src/schemas/index.js';
import router from './src/routers/products.router.js';
import errorHandlerMiddleware from './src/middlewarmies/error-handler.middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(errorHandlerMiddleware);

app.use(router)

app.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "pong" });
});

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  connect();
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();