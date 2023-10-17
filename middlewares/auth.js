const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // проверяем наличие jwt в заголовке запроса

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // если заголовка нет или не правильно начинается
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV !== 'production' ? 'some-secret-key' : JWT_SECRET,
    );
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload; // записываем в объект запроса пользователя св-во user со значением payload

  next(); // идем в следующий мидлвар
};
