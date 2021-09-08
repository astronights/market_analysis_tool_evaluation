import express from 'express';
import { createServer } from 'http';
import './config';

const app = express();

app.use(express.json());

const HOST = process.env.host || "127.0.0.1";
const PORT = parseInt(process.env.PORT || "3000");

const httpServer = createServer(app).listen(PORT, HOST, () => {
    console.log(`Started server at ${HOST}:${PORT}`);
})