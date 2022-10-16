import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './config/viewEngine';
import { initWebRoutes } from './routes/web';
import { connectDB } from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

let port = process.env.PORT || 8080;
let app = express();
app.use(cors({ credentials: true, origin: true }));
//config app

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);
initWebRoutes(app);
connectDB();

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
