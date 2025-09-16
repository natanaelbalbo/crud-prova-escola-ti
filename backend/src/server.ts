import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();
const PORT =  3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API rodando' });
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});