require('dotenv').config(); //
const express = require('express'); //
const mongoose = require('mongoose'); //
const helmet = require('helmet'); //
const cors = require('cors'); //
const limiter = require('./middlewares/limiter'); //
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express(); // создаем приложение на экспресс
app.use(
  // добавляем адресса откуда разрешены запросы
  cors({
    origin: ['http://localhost:3000',
      'http://localhost:3001',
      'http://movies-explorer.frnt.nomoredomainsrocks.ru',
      'https://movies-explorer.frnt.nomoredomainsrocks.ru'],
  }),
);
app.use(express.json()); // мидлвара парсящая в JSON
// app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(helmet()); // защита http, установка headers в ответы
app.use(limiter); // мидлвара, устанавливает лимит на запросы

app.use('/', router); // подключаем роутер к приложению

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb'); // подключаемся к БД

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}); // слушаем порт из .env
