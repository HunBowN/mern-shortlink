/* Эндпоинт (Endpoint - конечная точка) — это само обращение к маршруту отдельным HTTP методом. 
Эндпоинт выполняют конкретную задачу, принимают параметры и возвращают данные Клиенту. 

Мидлвары — функции, которые последовательно вызываются в процессе обновления данных в хранилище.
js middleware, или по-другому функция промежуточной обработки, 
используется для выполнения каких-либо действий на основе данных объекта запроса 
и ответа и передает обработку следующей функции.

req - это объект, содержащий информацию об HTTP-запросе, который вызвал событие. 
В ответ на req вы используете res для отправки требуемого ответа HTTP.

URI (Uniform Resource Identifier, унифицированный идентификатор ресурса)

HTTP — это протокол, позволяющий получать различные ресурсы, например HTML-документы. 
Протокол HTTP лежит в основе обмена данными в Интернете. HTTP является протоколом клиент-серверного 
взаимодействия, что означает инициирование запросов к серверу самим получателем, обычно веб-браузером.

диспатчинг - отправка действий
*/

const { Router } = require("express"); //require-затребовать
const bcrypt = require("bcryptjs"); // позволяет хешировать пароли и сравнивать
const { check, validationResult } = require("express-validator");
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароль 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {

    try {

      // console.log("body", req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          massage: "Неккоректные данные при регистрации",
        });
      }

      const { email, password } = req.body;

      // Проверить есть ли такой уже емейл у нас в базе:
      const candidate = await User.findOne( { email } );

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      // нужно зашифировать пароль, есть библиотека bcrypt (Женя крип)
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ massage: "Пользователь создан" });
    } catch (e) {
      res
        .status(500)
        .json({ massage: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// /api/auth/login
router.post("/login",

[
    check("email", "Введите  корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists()

],

async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        massage: "Неккоректные данные при входе в систему",
      });
    }

    const { email, password } = req.body;  
    
    const user = await User.findOne( { email } )

    if(!user) {
        return  res.status(400).json({ message: 'Пользователь не найден'} ) 
    }

    

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json( { message: 'Неверный пароль, попробуйте снова'} )
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }

    )

    res.json( {token, userId: user.id} )

  } catch (e) {
    es.status(500).json({ massage: "Something wrong, let try again'}" });
  }
});

module.exports = router;
