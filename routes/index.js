const router = require("express").Router(); // добавляем объект роутера
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const errHandler = require("../middlewares/centralizedError"); // обработчик ошибок, которые мы перенапряем через next(new Err...)
const NotFoundError = require("../errors/NotFoundError");
const { errors } = require("celebrate"); // добавляем обработчик ошибок от celebrate
const moviesRouter = require("./movies"); // импортируем роутуер для фильмов
const usersRouter = require("./users"); // импортируем роутер для пользователей
const {
  createUserValidate,
  loginValidate,
} = require("../middlewares/reqValidator"); // валидация про логине и создании юзера
const { requestLogger, errorLogger } = require("../middlewares/logger");

router.use(requestLogger);

router.post("/signin", loginValidate, login); // вход в аккаунт
router.post("/signup", createUserValidate, createUser); // создание аккаунта

router.use(auth); // проверка если мы зашли в аккаунт

router.use("/users", usersRouter); // добавляем роутеры к главному роутеру
router.use("/movies", moviesRouter);

// для всех отсалбных ссылок выдаем ошибку
router.all("*", (req, res, next) => {
  next(new NotFoundError("Неправильный адрес"));
});

router.use(errorLogger);

router.use(errors()); // обработчик для ошибок от celebrate
router.use(errHandler); // централизованный обрабработчик ошибок

module.exports = router; // импортируем главный роутер
