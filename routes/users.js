const { getAllUsers, getUser, updateUser } = require("../controllers/users"); // импортируем контроллеры для роутера
const router = require("express").Router(); // инициалищируем объект роутера
const { updateUserValidate } = require("../middlewares/reqValidator"); // импортируем мидлвары для проверки данных

router.get("/me", getUser); // настриваем запросы на роутер
router.patch("/me", updateUserValidate, updateUser);
router.get("/", getAllUsers);

module.exports = router; // экспортируем готовый роутер
