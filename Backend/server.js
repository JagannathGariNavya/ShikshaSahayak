import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
// import loginrouter from './routes/Login.js';
// import connectDB from './configs/db.js';
import bodyParser from 'body-parser';
import Otprouter from './routes/otprouter.js';
import connectDB from './configs/Db.js';
import loginrouter from './routes/Login.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/projects",projectRoutes);
app.use('/api', Otprouter);

app.use('/api',loginrouter)
app.use('/', (req, res) => {
    res.send("this is home route ");

});

const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        connectDB()
        console.log('mongo connected');
        console.log(`sever is runing at ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})
